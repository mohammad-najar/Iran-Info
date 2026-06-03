import { useState } from "react";
import {
  AlertTriangle,
  CreditCard,
  PackageX,
  RefreshCw,
  ShoppingBag,
  WifiOff,
} from "lucide-react";
import OfflineShopPhone from "./OfflineShopPhone";

function ShopDashboard() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const retry = () => {
    if (isRetrying) return;

    setIsRetrying(true);
    window.setTimeout(() => {
      setIsRetrying(false);
      setRetryCount((count) => count + 1);
    }, 850);
  };

  return (
    <div className="w-full max-w-[320px]">
      <div className="rounded-t-xl border border-white/15 bg-[#111827] p-2 shadow-2xl shadow-black/40">
        <div className="overflow-hidden rounded-md border border-white/10 bg-[#f8fafc] text-slate-800">
          <header className="flex h-10 items-center justify-between border-b border-slate-200 px-3">
            <span className="flex items-center gap-1.5 text-[11px] font-bold">
              <ShoppingBag size={13} />
              Shop Dashboard
            </span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </header>

          <main className="flex h-[190px] flex-col items-center justify-center px-5 text-center">
            <PackageX size={32} strokeWidth={1.6} className="text-red-500" />
            <h4 className="mt-3 text-sm font-bold">Unable to load orders</h4>
            <p className="mt-1 max-w-[220px] text-[11px] leading-4 text-slate-500">
              Products, customers, and incoming orders cannot be reached.
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-3 flex items-center gap-1.5 rounded border border-slate-300 px-2.5 py-1 text-[10px] font-bold text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
            >
              <RefreshCw size={11} className={isRetrying ? "animate-spin" : ""} />
              {isRetrying ? "Loading..." : "Retry"}
            </button>
            {retryCount > 0 && !isRetrying && (
              <span className="mt-2 text-[10px] font-semibold text-red-500">
                Storefront still offline
              </span>
            )}
          </main>
        </div>
      </div>
      <div className="mx-auto h-3 w-[116%] -translate-x-[7%] rounded-b-xl border border-white/10 bg-[#1f2937]" />
      <div className="mx-auto h-1.5 w-[54%] rounded-b-full bg-white/10" />
      <p className="mt-4 text-center text-xs font-medium text-white/45">
        Orders disappear overnight
      </p>
    </div>
  );
}

function PaymentTerminal() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const retry = () => {
    if (isRetrying) return;

    setHasFailed(false);
    setIsRetrying(true);
    window.setTimeout(() => {
      setIsRetrying(false);
      setHasFailed(true);
    }, 800);
  };

  return (
    <div className="w-[188px]">
      <div className="rounded-[22px] border border-white/15 bg-[#1f2937] p-3 shadow-2xl shadow-black/40">
        <div className="rounded-lg border border-white/10 bg-[#d9e6dc] px-3 py-4 text-[#23362d]">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em]">
              Payment
            </span>
            <WifiOff size={13} />
          </div>
          <CreditCard size={22} className="mt-5" />
          <p className="mt-3 text-sm font-bold">Transaction failed</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em]">
            Network unavailable
          </p>
          {hasFailed && (
            <p className="mt-3 flex items-center gap-1 text-[10px] font-bold text-red-700">
              <AlertTriangle size={11} />
              Payment not sent
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={retry}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-white/15 bg-white/5 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <RefreshCw size={12} className={isRetrying ? "animate-spin" : ""} />
          {isRetrying ? "Connecting" : "Retry payment"}
        </button>
      </div>
      <p className="mt-4 text-center text-xs font-medium text-white/45">
        Payments stop processing
      </p>
    </div>
  );
}

export default function BusinessFailureDevices() {
  return (
    <div className="relative my-10 border-y border-white/10 py-8 sm:my-12 sm:py-10">
      <OfflineShopPhone showImpactCaption={false} showDivider={false} />

      <div className="mt-12 grid justify-items-center gap-10 sm:mt-14 lg:mt-0">
        <div className="lg:absolute lg:right-[calc(50%+225px)] lg:top-[22%]">
          <ShopDashboard />
        </div>
        <div className="lg:absolute lg:left-[calc(50%+225px)] lg:top-[22%]">
          <PaymentTerminal />
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-white/55 sm:text-base">
        Imagine building a small online shop with years of work, only to wake up
        and find that you can no longer reach your customers or even see your
        own storefront.
      </p>
    </div>
  );
}
