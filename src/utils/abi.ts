import { Abi } from "starknet";

const CONTRACT_ABI = [
    {
        "name": "BlocHealthImpl",
        "type": "impl",
        "interface_name": "starknet_multiple_contracts::blochealth::IBlocHealth"
    },
    {
        "name": "starknet_multiple_contracts::blochealth::BlocHealth::Hospital",
        "type": "struct",
        "members": [
            {
                "name": "name",
                "type": "core::felt252"
            },
            {
                "name": "location",
                "type": "core::felt252"
            },
            {
                "name": "doe",
                "type": "core::integer::u64"
            },
            {
                "name": "hospital_reg_no",
                "type": "core::integer::u64"
            },
            {
                "name": "staff_count",
                "type": "core::integer::u64"
            },
            {
                "name": "patient_count",
                "type": "core::integer::u64"
            },
            {
                "name": "owner",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ]
    },
    {
        "name": "starknet_multiple_contracts::blochealth::IBlocHealth",
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
            },
            {
                "name": "add_hospital",
                "type": "function",
                "inputs": [
                    {
                        "name": "name",
                        "type": "core::felt252"
                    },
                    {
                        "name": "location",
                        "type": "core::felt252"
                    },
                    {
                        "name": "doe",
                        "type": "core::integer::u64"
                    },
                    {
                        "name": "hospital_reg_no",
                        "type": "core::integer::u64"
                    },
                    {
                        "name": "owner",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "name": "get_hospital",
                "type": "function",
                "inputs": [
                    {
                        "name": "hospital_id",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [
                    {
                        "type": "starknet_multiple_contracts::blochealth::BlocHealth::Hospital"
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
        "name": "starknet_multiple_contracts::blochealth::BlocHealth::HospitalCreated",
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
        "name": "starknet_multiple_contracts::blochealth::BlocHealth::AccessRoles",
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
        "name": "starknet_multiple_contracts::blochealth::BlocHealth::StaffAdded",
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
                "type": "starknet_multiple_contracts::blochealth::BlocHealth::AccessRoles"
            }
        ]
    },
    {
        "kind": "struct",
        "name": "starknet_multiple_contracts::blochealth::BlocHealth::PatientAdded",
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
        "name": "starknet_multiple_contracts::blochealth::BlocHealth::VisitRecordCreated",
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
        "name": "starknet_multiple_contracts::blochealth::BlocHealth::Event",
        "type": "event",
        "variants": [
            {
                "kind": "nested",
                "name": "HospitalCreated",
                "type": "starknet_multiple_contracts::blochealth::BlocHealth::HospitalCreated"
            },
            {
                "kind": "nested",
                "name": "StaffAdded",
                "type": "starknet_multiple_contracts::blochealth::BlocHealth::StaffAdded"
            },
            {
                "kind": "nested",
                "name": "PatientAdded",
                "type": "starknet_multiple_contracts::blochealth::BlocHealth::PatientAdded"
            },
            {
                "kind": "nested",
                "name": "VisitRecordCreated",
                "type": "starknet_multiple_contracts::blochealth::BlocHealth::VisitRecordCreated"
            }
        ]
    }
] as const satisfies Abi;

export default CONTRACT_ABI;
