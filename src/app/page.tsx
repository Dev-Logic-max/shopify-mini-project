// app/payment/page.tsx
import Image from "next/image";
import {
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { FaLock } from "react-icons/fa";

export default function PaymentDetail() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* ---------- LEFT: form ---------- */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md  p-2">
          {/* logo */}
          <div className="mx-auto w-24">
            <Image
              src="/logo.png"
              alt="Library of Alexandria"
              width={168}
              height={80}
            />
          </div>

          <h1 className=" text-[30px] lg:text-[45px] font-bold text-[#001845] text-center">
            Payment Details
          </h1>
          <p className="text-center text-[16px] lg:text-[20px] text-black ">
            This is to verify your account, <br />
            <span className="font-bold text-[16px] lg:text-[20px]">
              you won’t be charged during your free trial.
            </span>
          </p>

          <form className="w-auto lg:w-[485px] rounded-[9px]   space-y-4  shadow-md py-4 px-8 shadow-white  ">
            <Input
              placeholder="Card Holder Full Name"
              icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
            />
            <Input
              placeholder="Card Number"
              icon={<CreditCardIcon className="h-5 w-5 text-gray-400" />}
            />

            <div className="flex gap-3">
              <Input placeholder="MM/YY" className="flex-1" />
              <Input placeholder="CVV" className="flex-1" />
            </div>

            <Select />

            <button
              type="button"
              className="w-full rounded-md bg-[#001845] py-3 text-white font-medium shadow-lg ring-offset-2 transition hover:bg-[#002B7F] active:scale-95 cursor-pointer"
            >
              Start Free Trial for 7 Days
            </button>
            <div className=" flex flex-col w-full items-center text-xs space-y-2">
              <div className="flex items-center gap-1 w-full justify-between">
                <div className="flex items-center gap-1 ">
                  <FaLock className="h-[13px] w-[16px] text-black " />
                  <span>Secure Payments</span>
                </div>
                <span>Safe and Secure SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1 justify-between w-full">
                <button className="text-[#fff] bg-[#001845] rounded-[5px] w-[147px] h-[35px] cursor-pointer ">
                  powered by <span className="font-bold">stripe</span>
                </button>
                <div className="lg:mt-2">
                  <Image
                    src="/icons.png"
                    alt="Stripe, Visa, Mastercard, Apple Pay icons"
                    width={249}
                    height={29}
                    priority
                  />
                </div>
              </div>
            </div>
          </form>

          {/* footnotes */}

          {/* Trustpilot */}
          <div className=" flex justify-center ">
            <Image
              src="/startfram.png"
              alt="Trustpilot"
              width={157}
              height={39}
            />
          </div>
        </div>
      </section>

      {/* ---------- RIGHT: promo ---------- */}
      <section className=" hidden lg:flex w-full lg:w-1/2  items-center justify-center bg-[#FBF2E0] flex-col text-center p-6 lg:p-12 space-y-6">
        <div className="max-w-md p-6 lg:p-0">
          <h2 className="text-xl lg:text-2xl font-semibold text-start">
            Join
            <span className="inline-block bg-[#FCE29D] text-[#8A6E00] px-3 transtform -rotate-[6.36deg] rounded-full">
              2,000+
            </span>{" "}
            early Founders who have already answered the call to rebuild the
            Library of Alexandria
          </h2>
        </div>

        <div className="h-3/5">
          <div className=" w-full h-full">
            <Image
              src="/globstack.png"
              alt="Library of Alexandria"
              width={300}
              height={300}
              className="absolute  bottom-0 right-0 w-full max-w-md lg:max-w-md"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- helper components ---------------- */

function Input({
  icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <input
        {...props}
        className="peer w-full rounded-md border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm placeholder-gray-400 focus:border-[#001845] focus:ring-2 focus:ring-[#001845]/20"
      />
      {icon && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          {icon}
        </span>
      )}
    </div>
  );
}

function Select() {
  return (
    <div className="relative">
      <select
        className="w-full rounded-md border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm focus:border-[#001845] focus:ring-2 focus:ring-[#001845]/20"
        defaultValue="India"
      >
        <option>India</option>
        <option>Pakistan</option>
        <option>United Arab Emirates</option>
        <option>United States</option>
      </select>
    </div>
  );
}
