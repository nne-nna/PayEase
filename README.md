# PayEase Web

A React + Vite frontend for the PayEase bill payment platform. It supports authentication, wallet funding, bill payments, transactions, notifications, and profile management for Nigerian users.

---

## Live Features

- JWT authentication for login and registration
- Forgot password and reset password flow
- Wallet balance display
- Wallet funding via Paystack redirect flow
- Bill payments for electricity, airtime, data, and cable TV
- Transaction history with detail modal
- Real-time notifications with read and read-all actions
- User profile update and password change
- Dark mode support
- Standardized API error handling across auth, profile, and payment flows
- Inline backend field validation for registration and profile updates

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Frontend build tool |
| Tailwind CSS | Styling system |
| Axios | API client |
| React Router v7 | Client-side routing |
| lucide-react | Icons |
| Recharts | Analytics charts |
| Context API | State management |

---

## Architecture

```text
src/
|-- App.jsx
|-- api/
|   `-- axios.js
|-- components/
|-- context/
|-- hooks/
|-- modal/
|-- pages/
|   |-- Login.jsx
|   |-- Register.jsx
|   |-- ForgotPassword.jsx
|   |-- ResetPassword.jsx
|   |-- Dashboard.jsx
|   |-- Analytics.jsx
|   |-- BillPayment.jsx
|   |-- Transactions.jsx
|   |-- Notifications.jsx
|   `-- Profile.jsx
|-- providers/
`-- utils/
    |-- apiErrors.js
    `-- generateReceipt.js
```

---

## Setup and Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API available at `https://bill-payment-system.onrender.com/api/v1` or your local backend URL

### 1. Clone repository

```bash
git clone https://github.com/nne-nna/bill-payment-frontend.git
cd bill-payment-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Build for production

```bash
npm run build
```

---

## API Endpoints

### Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

### Wallet

- `GET /api/v1/wallet/balance`
- `POST /api/v1/wallet/fund`
- `GET /api/v1/wallet/verify/{reference}`

### Bills

- `POST /api/v1/bills/pay`

### Transactions

- `GET /api/v1/transactions`

### Notifications

- `GET /api/v1/notifications`
- `GET /api/v1/notifications/unread`
- `POST /api/v1/notifications/{id}/read`
- `POST /api/v1/notifications/read-all`

### User

- `GET /api/v1/user/profile`
- `POST /api/v1/user/profile`
- `POST /api/v1/user/change-password`

---

## Error Handling and Validation

The frontend now supports the backend's standardized error response shape:

```json
{
  "timestamp": "2026-04-06T23:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/v1/user/profile",
  "errors": {
    "phone": "Phone number must be a valid Nigerian mobile number"
  }
}
```

Implemented behavior:

- General API failures use `response.data.message`
- Field-level validation uses `response.data.errors`
- `429 Too Many Requests` on login, register, and forgot-password shows `Too many requests. Please try again in a minute.`
- Register shows inline backend validation errors for `phone`
- Profile update shows inline backend validation errors for `firstName`, `lastName`, and `phone`
- Wallet verification references are validated client-side before calling `/wallet/verify/{reference}`
- Shared parsing and helpers live in `src/utils/apiErrors.js`

---

## Frontend Behavior

1. Register and login store JWT in local storage.
2. Auth pages reuse a shared error parser for standard and rate-limit responses.
3. Wallet funding calls `/wallet/fund` to retrieve a Paystack authorization URL.
4. The user is redirected to Paystack and then returns to the app.
5. Wallet verification runs through `/wallet/verify/{reference}` after client-side reference validation.
6. Bill payments call `/bills/pay` with the selected provider payload.
7. Register and profile forms render backend validation errors inline when `errors` is present.

---

## Troubleshooting

- If Paystack redirect does not work, check the backend URL in `src/api/axios.js`.
- If reset password fails, ensure the reset email token is present in `/reset-password?token=...`.
- If authenticated requests fail with `401`, confirm the JWT exists in local storage and has not expired.
- If auth requests fail with `429`, wait about a minute and retry.

---

## Authors

**Nnenna Ezidiegwu**

- GitHub: [@nne-nna](https://github.com/nne-nna)
- LinkedIn: [Ezidiegwu Nnenna](https://www.linkedin.com/in/nnenna-ezidiegwu-23404124b/)
