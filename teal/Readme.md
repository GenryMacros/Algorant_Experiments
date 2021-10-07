### Create smart contract
goal app create --creator addres --approval-prog appl.teal --clear-prog clear.teal


After creation you'll see (goal account list) that new prog-id has been bounded to creator account


To use transfer sc functions like mint or transfer, you need to specify function name in first app-arg ("acfg" for creation, "axfer"). I took this names from Algorant transaction docs https://developer.algorand.org/docs/get-details/transactions/transactions/#metadatahash
