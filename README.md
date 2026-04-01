# PayEase Web (Bill Payment Frontend)

A React + Vite frontend for the PayEase bill payment platform. Supports user authentication, wallet funding via Paystack, and bill payment across major Nigerian providers.

---

## Live Features

- JWT authentication for login and registration
- Forgot password + reset password flow (email token)
- Wallet balance display
- Wallet funding via Paystack (redirect flow)
- Bill payments for electricity, airtime, data, cable TV
- Transaction history with details
- Real-time notifications and read/read-all actions
- User profile management (update and change password)
- Dark mode support

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Frontend build tool |
| Tailwind CSS | Styling system |
| Axios | API client |
| React Router v6 | Client-side routing |
| lucide-react | Icons |
| Recharts | Analytics charts |
| Zustand/Context | State management (context-based) |

---

## Architecture

```text
react
  ├── App.jsx
  ├── pages/
  │   ├── Login.jsx
  │   ├── Register.jsx
  │   ├── ForgotPassword.jsx
  │   ├── ResetPassword.jsx
  │   ├── Dashboard.jsx
  │   ├── Analytics.jsx
  │   ├── BillPayment.jsx
  │   ├── Transactions.jsx
  │   ├── Notifications.jsx
  │   └── Profile.jsx
  ├── components/
  │   ├── Layout.jsx
  │   ├── Navbar.jsx
  │   ├── SideBar.jsx
  │   ├── Toast.jsx
  │   ├── ProtectedRoute.jsx
  │   └── PublicRoute.jsx
  ├── context/
  │   ├── AuthContext.jsx
  │   ├── ToastContext.jsx
  │   └── ThemeContext.jsx
  ├── api/axios.js
  └── utils/
      └── generateReceipt.js
``` 

---

## Setup and Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API deployed/available (example: https://bill-payment-system.onrender.com/api/v1)

### 1. Clone repository

```bash
git clone https://github.com/nne-nna/bill-payment-frontend.git
cd bill-payment-frontend
```

### 2. Install dependencies

```bash
npm install
# or
# yarn
```

### 3. Configure environment variables

Create `.env` at project root (optional, depending on Vite config):

```env
VITE_API_BASE_URL=https://bill-payment-system.onrender.com/api/v1
```

### 4. Start development server

```bash
npm run dev
# or
# yarn dev
```

Open `http://localhost:5173` in browser.

---

## API Endpoints (Backend)

Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

Wallet

- `GET /api/v1/wallet/balance`
- `POST /api/v1/wallet/fund`
- `GET /api/v1/wallet/verify/{reference}`

Bills

- `POST /api/v1/bills/pay`

Transactions

- `GET /api/v1/transactions`

Notifications

- `GET /api/v1/notifications`
- `GET /api/v1/notifications/unread`
- `POST /api/v1/notifications/{id}/read`
- `POST /api/v1/notifications/read-all`

User

- `GET /api/v1/user/profile`
- `POST /api/v1/user/profile`
- `POST /api/v1/user/change-password`

---

## Folder Structure

```text
src/
│
├── api/axios.js
├── components/
├── context/
├── hooks/
├── modal/
├── pages/
├── providers/
└── utils/
```

---

## Frontend Behavior

1. register/login stores JWT in local storage
2. wallet page calls `/wallet/fund` to get Paystack authorization URL
3. user is redirected to Paystack and returns after payment
4. payment verification via `/wallet/verify/{reference}`
5. bill payments call `/bills/pay` with selected provider payload

---

## Troubleshooting

- If paystack redirect does not work, check browser popup blocker and backend URL in `src/api/axios.js`
- If reset-password fails, ensure reset email token is included in `/reset-password?token=` query param
- Check console/network for 401 errors and ensure auth token is present

---

## Authors

**Nnenna Ezidiegwu**

- GitHub: [@nne_nna](https://github.com/nne-nna)
- LinkedIn: [Ezidiegwu Nnenna](https://www.linkedin.com/in/nnenna-ezidiegwu-23404124b/)

---


