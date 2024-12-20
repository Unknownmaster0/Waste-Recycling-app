import randomstring from 'randomstring';

export default function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  });
}
