#!/usr/bin/env bash
set -euo pipefail

# One-off verification script — NOT part of the n8n node, not registered anywhere
# in package.json. Confirms whether OpenSolar's documented "POST to
# /<resource>/:id/" pattern actually behaves as create-or-update, before we
# build Create/Update node operations for Costing, Payment Options, Pricing
# Schemes, and the four Hardware Activation resources — all of which document
# this same POST-to-:id shape in RESOURCE-PLAN.md's "Notes for review" section.
#
# Defaults to testing Costing (the one already confirmed — see RESOURCE-PLAN.md
# §1). Set RESOURCE_PATH to point it at a different resource, e.g.:
#   RESOURCE_PATH=payment_options
#   RESOURCE_PATH=pricing_schemes
#   RESOURCE_PATH=component_module_activations
#
# Tests, in order:
#   1. GET  the resource list (baseline — also gives us a real id for step 4)
#   2. POST to the plain list endpoint (no id) — does this create?
#   3. POST to /<resource>/999999999/ (fabricated, near-certainly-nonexistent id)
#   4. (opt-in only) POST to a REAL existing id, to see if it mutates that
#      record. Skipped unless you explicitly pass MUTATE_EXISTING_ID, because
#      this genuinely mutates real data in your org.
#   5. Cleanup — deletes the test record created in step 2, if we can find its id.
#
# Usage:
#   OPENSOLAR_TOKEN=<bearer token> OPENSOLAR_ORG_ID=<org id> \
#     ./scripts/verify-costing-post-pattern.sh
#
#   RESOURCE_PATH=payment_options OPENSOLAR_TOKEN=... OPENSOLAR_ORG_ID=... \
#     ./scripts/verify-costing-post-pattern.sh
#
# Run this in your OWN terminal, not by pasting your token into this chat —
# treat the bearer token like any other credential.
#
# Optional env vars:
#   OPENSOLAR_BASE_URL    defaults to https://api.opensolar.com
#   RESOURCE_PATH         defaults to "costings". The org-scoped path segment
#                         to test, e.g. "payment_options", "pricing_schemes",
#                         "component_module_activations".
#   TEST_BODY             JSON body sent in step 2/3/4's POST. Defaults to a
#                         {"title": ...} payload, which matches Costing/
#                         Payment Options/Pricing Schemes' schemas. Modules/
#                         Inverters/Batteries/Other Components don't have a
#                         "title" field — for those, a schema-mismatched body
#                         is fine (we're checking routing behavior via status
#                         code, not aiming for a fully valid create; a 400 for
#                         missing/wrong fields is still informative and
#                         distinct from 404/405), but you can override this to
#                         get a cleaner result if you want an actual 201.
#   MUTATE_EXISTING_ID    a real id from step 1's output. If set, step 4 runs
#                         and WILL overwrite that record's fields.
#
# NOTE: cleanup (step 5) assumes the resource supports DELETE, which is true
# for Costing/Payment Options/Pricing Schemes/Modules/Inverters/Batteries/
# Other Components per RESOURCE-PLAN.md. If nothing was created in step 2
# (e.g. because TEST_BODY didn't satisfy the resource's required fields),
# step 5 just reports that and does nothing.

: "${OPENSOLAR_TOKEN:?Set OPENSOLAR_TOKEN to a bearer token}"
: "${OPENSOLAR_ORG_ID:?Set OPENSOLAR_ORG_ID to your org id}"
BASE_URL="${OPENSOLAR_BASE_URL:-https://api.opensolar.com}"
RESOURCE_PATH="${RESOURCE_PATH:-costings}"
TEST_BODY="${TEST_BODY:-{\"title\": \"__verify_post_pattern_test__\", \"description\": \"Temporary — created by verify-costing-post-pattern.sh, safe to delete\"}}"
AUTH_HEADER="Authorization: Bearer ${OPENSOLAR_TOKEN}"
RESOURCE_URL="${BASE_URL}/api/orgs/${OPENSOLAR_ORG_ID}/${RESOURCE_PATH}/"

hr() { printf -- '-%.0s' $(seq 1 80); echo; }

extract_body() {
	# Strips response headers from a `curl -i` capture, leaving just the body.
	sed -n '/^\r\{0,1\}$/,$p' | tail -n +2
}

extract_id() {
	grep -oE '"id"[[:space:]]*:[[:space:]]*[0-9]+' | head -1 | grep -oE '[0-9]+' || true
}

echo "Testing resource: ${RESOURCE_PATH} (${RESOURCE_URL})"
echo

echo "== Step 1: GET existing ${RESOURCE_PATH} (baseline) =="
hr
STEP1=$(curl -sS -i "${RESOURCE_URL}" -H "${AUTH_HEADER}")
echo "${STEP1}"
hr

echo
echo "== Step 2: POST to the plain list endpoint — does this create? =="
hr
STEP2=$(curl -sS -i -X POST "${RESOURCE_URL}" \
	-H "${AUTH_HEADER}" \
	-H "Content-Type: application/json" \
	-d "${TEST_BODY}")
echo "${STEP2}"
hr
CREATED_ID=$(echo "${STEP2}" | extract_body | extract_id)

echo
echo "== Step 3: POST to a fabricated, near-certainly-nonexistent :id =="
hr
curl -sS -i -X POST "${RESOURCE_URL}999999999/" \
	-H "${AUTH_HEADER}" \
	-H "Content-Type: application/json" \
	-d "${TEST_BODY}"
echo
hr

if [ -n "${MUTATE_EXISTING_ID:-}" ]; then
	echo
	echo "== Step 4 (opt-in): POST to EXISTING ${RESOURCE_PATH} id ${MUTATE_EXISTING_ID} =="
	echo "   This mutates a real record. Ctrl-C now to abort."
	sleep 3
	hr
	echo "-- before --"
	curl -sS -i "${RESOURCE_URL}${MUTATE_EXISTING_ID}/" -H "${AUTH_HEADER}"
	echo
	echo "-- POST attempt --"
	curl -sS -i -X POST "${RESOURCE_URL}${MUTATE_EXISTING_ID}/" \
		-H "${AUTH_HEADER}" \
		-H "Content-Type: application/json" \
		-d "${TEST_BODY}"
	echo
	echo "-- after --"
	curl -sS -i "${RESOURCE_URL}${MUTATE_EXISTING_ID}/" -H "${AUTH_HEADER}"
	echo
	hr
else
	echo
	echo "Skipping Step 4 (mutate an existing id). To run it:"
	echo "  MUTATE_EXISTING_ID=<a real ${RESOURCE_PATH} id from Step 1> RESOURCE_PATH=${RESOURCE_PATH} OPENSOLAR_TOKEN=... OPENSOLAR_ORG_ID=... $0"
fi

echo
if [ -n "${CREATED_ID:-}" ]; then
	echo "== Cleanup: deleting the test ${RESOURCE_PATH} record created in Step 2 (id=${CREATED_ID}) =="
	hr
	curl -sS -i -X DELETE "${RESOURCE_URL}${CREATED_ID}/" -H "${AUTH_HEADER}"
	echo
else
	echo "Could not detect a created id from Step 2's response — check the output above. If Step 2 returned 201, delete the test entry manually; if it returned 400, TEST_BODY probably didn't satisfy this resource's required fields, which is fine for routing verification purposes."
fi
