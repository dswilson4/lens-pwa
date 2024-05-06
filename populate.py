import os
import requests
import binascii

def generate_addresses(num_iterations):
    output = []
    for _ in range(num_iterations):
        address = "0x" + binascii.b2a_hex(os.urandom(20)).decode("UTF-8")
        output.append(address)
    return output

num_iterations = 40
wallet_addresses = generate_addresses(num_iterations)
contract_addresses = generate_addresses(num_iterations)

def create_new_users():
    for i in range(len(wallet_addresses)):
        url = "http://localhost:3000/"
        endpoint = "api/users"

        # Submit new users
        response = requests.post(
            url=f"{url}{endpoint}",
            json={
                "walletAddress": f"{wallet_addresses[i]}",
                "contractAddress": f"{contract_addresses[i]}",
            }
        )
        print(response.json())
create_new_users()
