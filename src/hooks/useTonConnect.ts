import { TonConnectUI, useTonConnectUI } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';
import { useEffect, useState } from 'react';

export function useTonConnect(): { sender: Sender; connected: Boolean } {
  const [tonConnectUI1] = useTonConnectUI();
  const [connected, setConnected] = useState(tonConnectUI1.connected);

  useEffect(() => {
    tonConnectUI1.onStatusChange(() => {
      setConnected(tonConnectUI1.connected);
    })
  }, [tonConnectUI1]);

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI1.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected,
  };
}
