const Nexmo = require('nexmo');

export const nexmo = new Nexmo({
  apiKey: '4f5d06ad',
  apiSecret: 'TRI28bOSxNwMIPSX',
});

const from = 'Vonage APIs';
const to = '821071640087';

export const send = (phonenumber: string, code: string) => {
  const phoneNumber = phonenumber.replace(/-/g, '');

  const result = `82${phoneNumber.substr(1, phoneNumber.length)}`;
  console.log(code);
  
  nexmo.message.sendSms(from, to, code);
};
