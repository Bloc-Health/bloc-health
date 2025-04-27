import type { Abi } from "abitype";
const CONTRACT_ABI = [
    {
        "name": "BlocHealthImpl",
        "type": "impl",
        "interface_name": "___testsingle::IBlocHealth"
    },
    {
        "name": "___testsingle::IBlocHealth",
        "type": "interface",
        "items": [
            {
                "name": "get_owner",
                "type": "function",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "state_mutability": "view"
            }
        ]
    },
    {
        "name": "constructor",
        "type": "constructor",
        "inputs": []
    },
    {
        "kind": "struct",
        "name": "___testsingle::BlocHealth::HospitalCreated",
        "type": "event",
        "members": [
            {
                "kind": "data",
                "name": "name",
                "type": "core::felt252"
            },
            {
                "kind": "data",
                "name": "hospital_id",
                "type": "core::felt252"
            },
            {
                "kind": "data",
                "name": "owner",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ]
    },
    {
        "name": "___testsingle::BlocHealth::AccessRoles",
        "type": "enum",
        "variants": [
            {
                "name": "Admin",
                "type": "()"
            },
            {
                "name": "Doctor",
                "type": "()"
            },
            {
                "name": "Nurse",
                "type": "()"
            },
            {
                "name": "Staff",
                "type": "()"
            }
        ]
    },
    {
        "kind": "struct",
        "name": "___testsingle::BlocHealth::StaffAdded",
        "type": "event",
        "members": [
            {
                "kind": "data",
                "name": "hospital_id",
                "type": "core::felt252"
            },
            {
                "kind": "data",
                "name": "address",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "kind": "data",
                "name": "role",
                "type": "___testsingle::BlocHealth::AccessRoles"
            }
        ]
    },
    {
        "kind": "struct",
        "name": "___testsingle::BlocHealth::PatientAdded",
        "type": "event",
        "members": [
            {
                "kind": "data",
                "name": "name",
                "type": "core::felt252"
            },
            {
                "kind": "data",
                "name": "hospital_id",
                "type": "core::felt252"
            },
            {
                "kind": "data",
                "name": "patient",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ]
    },
    {
        "kind": "struct",
        "name": "___testsingle::BlocHealth::VisitRecordCreated",
        "type": "event",
        "members": [
            {
                "kind": "data",
                "name": "name",
                "type": "core::felt252"
            },
            {
                "kind": "data",
                "name": "patient",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "kind": "data",
                "name": "date",
                "type": "core::integer::u64"
            }
        ]
    },
    {
        "kind": "enum",
        "name": "___testsingle::BlocHealth::Event",
        "type": "event",
        "variants": [
            {
                "kind": "nested",
                "name": "HospitalCreated",
                "type": "___testsingle::BlocHealth::HospitalCreated"
            },
            {
                "kind": "nested",
                "name": "StaffAdded",
                "type": "___testsingle::BlocHealth::StaffAdded"
            },
            {
                "kind": "nested",
                "name": "PatientAdded",
                "type": "___testsingle::BlocHealth::PatientAdded"
            },
            {
                "kind": "nested",
                "name": "VisitRecordCreated",
                "type": "___testsingle::BlocHealth::VisitRecordCreated"
            }
        ]
    }
] as unknown as Abi;

export default CONTRACT_ABI;
