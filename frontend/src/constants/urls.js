const BASE_URL = 'http://localhost:5000/api';

export const DOCTORS_URL = `${BASE_URL}/doctors`;
export const NO_PICTURE_URL =
  "https://drmanikdalvi.getmy.clinic/_next/image?url=%2Fimages%2Ffemale_doctor.jpg&w=256&q=75";
export const SEND_OTP_URL = `${BASE_URL}/users/send-otp`;
export const VERIFY_OTP_URL = `${BASE_URL}/users/verify-otp`;
export const CURRENT_USER_URL = `${BASE_URL}/users/me`;
export const BOOK_APPOINTMENT_URL = `${BASE_URL}/appointments`;