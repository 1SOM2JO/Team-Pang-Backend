const Nexmo = require('nexmo');

export const nexmo = new Nexmo({
  apiKey: '4f5d06ad',
  apiSecret: 'TRI28bOSxNwMIPSX',
});

const from = 'Vonage APIs';
const to = '821071640087';

export const send = (phonenumber: string, text: string) => {
  nexmo.message.sendSms(from, to, text);
};
