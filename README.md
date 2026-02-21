
---

# Billing — Premium Access with Clerk & Razorpay

A full-stack premium subscription system built using **Next.js (App Router)**, **Clerk authentication**, **Razorpay payments**, and **Prisma + Neon Postgres**.

This project demonstrates a production-style SaaS architecture with secure webhook verification, database-backed order persistence, and dynamic premium access control.

---

## 🧠 Features

✨ **Secure Authentication**
User login and session management powered by Clerk.

💳 **Razorpay Payment Integration**
Supports UPI, cards, and netbanking with server-side order creation.

🔐 **Webhook Verification**
Secure server-side HMAC signature verification for Razorpay events.

⚙️ **Premium Access Control**
Clerk public metadata is updated after verified payments to unlock premium features.

🗄 **Database Integration (Prisma + Neon Postgres)**
Stores order records, payment status, and user mapping.

📊 **Dashboard System**
Displays user profile, latest order details, and premium status.

---

## 📦 Tech Stack

| Layer          | Technology             |
| -------------- | ---------------------- |
| Runtime        | **Bun**                |
| Frontend       | Next.js (App Router)   |
| Authentication | Clerk                  |
| Payments       | Razorpay (UPI + Cards) |
| Database       | Prisma + Neon Postgres |
| Backend        | Razorpay Node SDK      |
| Styling        | Tailwind CSS + Shadcn  |        |

---

# ⚙️ Setup & Installation (Using Bun)

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/anuj2731997/Billing.git
cd Billing
```

---

## 2️⃣ Install Dependencies

```bash
bun install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and copy values from `sample.env`.

```env
# Razorpay (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
CLERK_WEBHOOK_SECRET="your_clerk_webhook_secret"

# Database
DATABASE_URL="your_neon_postgres_connection_string"

# App URL
#NEXT_PUBLIC_DEVELOPMENT_URL="https://your-ngrok-url"


NEXT_PUBLIC_BASE_URL="http://localhost:3000"

```

---

# 🗄 Prisma Setup

From the project root:

```bash
bun --bun run prisma generate
bun --bun run prisma migrate deploy
```

For local development:

```bash
bun --bun run prisma migrate dev
```

---

# 🚀 Run Development Server

```bash
bun run dev
```

For webhook testing locally, expose your server using:

* ngrok
* zrok

Then use:

```
https://your-ngrok-url
```

---

# 💳 Razorpay Webhook Setup

## 1️⃣ Create Webhook in Razorpay Dashboard

Navigate to:

Razorpay Dashboard → Settings → Webhooks

Add endpoint:

```
https://your-domain.com/api/webhook/razorpay
```

For local testing:

```
https://your-ngrok-url/api/webhook/razorpay
```

Select events:

* payment.captured
* payment.failed

Ensure you use the correct `RAZORPAY_WEBHOOK_SECRET` from Test Mode.

---

# 🔐 Clerk Webhook Setup

Navigate to:

Clerk Dashboard → Webhooks

Add endpoint:

```
https://your-domain.com/api/webhook/clerk
```

For local testing:

```
https://your-ngrok-url/api/webhook/clerk
```

Set:

```
CLERK_WEBHOOK_SECRET
```

Clerk webhooks can be used for:

* User created
* User deleted
* Email updated

---

# 🧪 Testing Payments (Razorpay Test Mode)

Ensure:

* Razorpay is in **Test Mode**
* Webhook is configured in **Test Mode**
* Correct webhook secret is used
---

---

# 🎓 Learning Outcomes

This project demonstrates:

* Production-grade Next.js App Router architecture
* Secure authentication using Clerk
* Payment gateway integration with Razorpay
* Webhook signature validation
* Metadata-driven feature access
* Database-backed order management

---

# 🧑‍💻 Author

**Anuj**
Computer Science Engineering Student
Focused on building secure, scalable, full-stack SaaS systems.

