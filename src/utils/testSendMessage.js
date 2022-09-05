import { Buffer } from "buffer"

import {store} from '../store/store'


export const testSendMessage = async (nodeApi, recipient, body) => {
    await fetch(`${nodeApi}/api/v2/messages`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(store.getState().peer.securityToken).toString('base64')}`,
            'Content-Type': 'application/json',
            'Accept-Content': 'application/json',
        },
        body: JSON.stringify({
            'body': body,
            'recipient': recipient,
        }),
    }).catch((err) => console.error(err))
  }