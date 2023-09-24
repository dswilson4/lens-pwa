'use client'
import { usePathname } from 'next/navigation';
import { useWallets } from '@privy-io/react-auth';
import CreatorFeed from './CreatorFeed';

const CreatorDetail = ({ params }: { params: { id: string } }) => {
  const router = usePathname();
  console.log(router);
  
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

  // Replace this with your creator data retrieval logic based on the ID
  // For this example, we'll use dummy data again.
  const creator = {
    id: params.id,
    name: `Creator ${params.id}`,
    description: `Description for Creator ${params.id}`,
    keyPrice: 10.8,
    subscriptionFee: 0.83,
  };

  return (
    <main className="px-10 py-14">
      <div className="text-left"> {/* Align content to the left */}
        <img src="/images/icons/iconmain-128x128.png" alt="Logo" className="mb-4 max-w-48 rounded-full" /> {/* Remove mx-auto for left alignment */}
        <h1 className="text-3xl font-semibold text-blue-500">{creator.name}</h1>
      </div>

      <div className="flex justify-start mt-4"> {/* Align content to the left */}
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-2 rounded">
            <p className="font-semibold">Wallet Address</p>
          </div>
          <div className="ml-2 bg-orange-500 text-white p-2 rounded">
            <p className="font-semibold">Test.lens</p>
          </div>
        </div>
      </div>
      <div className="text-2xl mt-4 font-semibold">{creator.keyPrice} ETH</div>

      <div className="text-left mt-2"> {/* Align content to the left */}
        <p className="text-xl text-white-600">{`SUBSCRIPTION FEE: ${creator.subscriptionFee} ETH / MONTH (EST.)`}</p>
      </div>

      <div className="text-left mt-2"> {/* Align content to the left */}
        <p className="text-white-200">(goes directly to the artist)</p>
      </div>
      <CreatorFeed/>
    </main>
  );
};

export default CreatorDetail;
