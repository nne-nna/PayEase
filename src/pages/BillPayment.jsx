import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Zap, Phone, Wifi, Tv, Wallet, ChevronDown } from "lucide-react";
import api from "../api/axios";
import useToast from "../hooks/useToast";
import { SuccessModal } from "../modal/SuccessModal";
import { electricityProviders } from "../providers/ElectricityProviders";
import { airtimeProviders } from "../providers/AirtimeProviders";
import { dataProviders, dataVariations } from "../providers/DataProviders";
import { cableProviders, cableVariations } from "../providers/CableProviders";
import TestModeBanner from "../components/TestModeBanner";
import PlanSelectorModal from "../modal/PlanSelectorModal";

const PlanTriggerButton = ({ label, selectedPlan, onClick, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-xl border text-left flex items-center justify-between transition ${
        disabled
          ? "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-green-400 dark:hover:border-green-600 cursor-pointer"
      }`}
    >
      {selectedPlan ? (
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-gray-800 dark:text-white font-medium truncate pr-4">
            {selectedPlan.name}
          </span>
          <span className="text-sm font-bold text-green-600 dark:text-green-400 flex-shrink-0">
            ₦{parseFloat(selectedPlan.variation_amount).toLocaleString()}
          </span>
        </div>
      ) : (
        <span className="text-gray-400 text-sm">
          {disabled ? "Select a network first" : `Tap to select ${label}`}
        </span>
      )}
      <ChevronDown size={16} className="text-gray-400 ml-2 flex-shrink-0" />
    </button>
  </div>
);

const serviceCategories = [
  {
    id: "fund",
    label: "Fund Wallet",
    icon: Wallet,
    color: "bg-green-500",
    description: "Add money to your wallet via Paystack",
  },
  {
    id: "electricity",
    label: "Electricity",
    icon: Zap,
    color: "bg-yellow-500",
    description: "Pay electricity bills",
  },
  {
    id: "airtime",
    label: "Airtime",
    icon: Phone,
    color: "bg-blue-500",
    description: "Buy airtime for any network",
  },
  {
    id: "data",
    label: "Data",
    icon: Wifi,
    color: "bg-purple-500",
    description: "Buy data bundles",
  },
  {
    id: "cable",
    label: "Cable TV",
    icon: Tv,
    color: "bg-red-500",
    description: "Pay DSTV, GoTV, Startimes",
  },
];

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  </div>
);

const BillPayment = () => {
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("action") || searchParams.get("service") || "electricity",
  );
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  // Fund wallet state
  const [fundAmount, setFundAmount] = useState("");
  const [fundingStatus, setFundingStatus] = useState("idle");

  // Bill payment state
  const [billForm, setBillForm] = useState({
    serviceID: "",
    billersCode: "",
    variationCode: "",
    amount: "",
    phone: "",
  });

  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [planModalConfig, setPlanModalConfig] = useState({
    title: "",
    plans: [],
  });

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const response = await api.get("/wallet/balance");
      setWalletBalance(response.data.balance);
    } catch (err) {
      console.error("Failed to fetch balance");
    }
  };

  const handleBillFormChange = (e) => {
    const { name, value } = e.target;
    setBillForm((prev) => ({ ...prev, [name]: value }));

    // Auto set variationCode for airtime
    if (name === "serviceID" && activeCategory === "airtime") {
      const provider = airtimeProviders.find((p) => p.value === value);
      if (provider) {
        setBillForm((prev) => ({
          ...prev,
          serviceID: value,
          variationCode: provider.variationCode,
        }));
      }
    }
  };

  const pollForPayment = (reference) => {
    setFundingStatus("waiting");
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;
      try {
        await api.get(`/wallet/verify/${reference}`);
        clearInterval(interval);
        setFundingStatus("success");
        toast.success("Wallet funded successfully! 🎉");
        fetchWalletBalance();
        setTimeout(() => {
          setFundingStatus("idle");
          setFundAmount("");
        }, 3000);
      } catch {
        if (attempts === 60) {
          toast.info("Still waiting for payment confirmation...");
        }
      }
    }, 5000);

    return interval;
  };

  // Fund wallet
  const handleFundWallet = async (e) => {
    e.preventDefault();
    if (!fundAmount || fundAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/wallet/fund", {
        amount: parseFloat(fundAmount),
      });

      window.open(response.data.authorizationUrl, "_blank");
      toast.info(
        "Complete your payment in the new tab. Your wallet will update automatically.",
      );
      setLoading(false);
      pollForPayment(response.data.reference);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to initialize payment",
      );
      setLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!pendingReference) return;
    setVerifying(true);
    try {
      await api.get(`/wallet/verify/${pendingReference}`);
      toast.success("Wallet funded successfully! 🎉");
      setPendingReference(null);
      setFundAmount("");
      fetchWalletBalance();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Payment not confirmed yet. Please try again.",
      );
    } finally {
      setVerifying(false);
    }
  };
  // Pay bill
  const handlePayBill = async (e) => {
    e.preventDefault();

    if (!billForm.serviceID) {
      toast.error("Please select a provider");
      return;
    }
    if (!billForm.billersCode) {
      toast.error("Please enter meter/account/phone number");
      return;
    }
    if (!billForm.amount || billForm.amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (activeCategory === "electricity" && !billForm.variationCode) {
      toast.error("Please select account type (Prepaid/Postpaid)");
      return;
    }
    if (
      (activeCategory === "data" || activeCategory === "cable") &&
      !billForm.variationCode
    ) {
      toast.error("Please enter a variation code");
      return;
    }

    setLoading(true);
    try {
      // For airtime and data, phone = billersCode (number being recharged)
      const phone =
        activeCategory === "airtime" || activeCategory === "data"
          ? billForm.billersCode
          : billForm.phone || "08000000000";

      const response = await api.post("/bills/pay", {
        serviceID: billForm.serviceID,
        billersCode: billForm.billersCode,
        variationCode: billForm.variationCode,
        amount: parseFloat(billForm.amount),
        phone: phone,
      });

      setSuccessResult(response.data);
      fetchWalletBalance();
      setBillForm({
        serviceID: "",
        billersCode: "",
        variationCode: "",
        amount: "",
        phone: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    // Fund Wallet Form
    if (activeCategory === "fund") {
      return (
        <div className="space-y-5">
          {fundingStatus === "idle" && (
            <form onSubmit={handleFundWallet} className="space-y-5">
              <InputField
                label="Amount (₦)"
                type="number"
                placeholder="Enter amount e.g 5000"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                min="100"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Processing...
                  </>
                ) : (
                  "Fund Wallet"
                )}
              </button>
            </form>
          )}

          {fundingStatus === "waiting" && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Waiting for payment confirmation
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Complete your payment on Paystack. This will update
                  automatically.
                </p>
              </div>
              <button
                onClick={() => setFundingStatus("idle")}
                className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                Cancel and start over
              </button>
            </div>
          )}

          {fundingStatus === "success" && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✅</span>
              </div>
              <p className="font-semibold text-green-600 dark:text-green-400">
                Wallet funded successfully!
              </p>
            </div>
          )}
        </div>
      );
    }

    // Electricity Form
    if (activeCategory === "electricity") {
      return (
        <form onSubmit={handlePayBill} className="space-y-5">
          <SelectField
            label="Provider"
            name="serviceID"
            value={billForm.serviceID}
            onChange={handleBillFormChange}
            options={electricityProviders}
          />
          <SelectField
            label="Account Type"
            name="variationCode"
            value={billForm.variationCode}
            onChange={handleBillFormChange}
            options={[
              { label: "Prepaid", value: "prepaid" },
              { label: "Postpaid", value: "postpaid" },
            ]}
          />
          <InputField
            label="Meter Number"
            type="text"
            name="billersCode"
            placeholder="Enter meter number"
            value={billForm.billersCode}
            onChange={handleBillFormChange}
            required
          />
          <InputField
            label="Amount (₦)"
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={billForm.amount}
            onChange={handleBillFormChange}
            min="100"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Processing payment...</span>
                </div>
                <span className="text-xs text-white/70">
                  This may take a few seconds
                </span>
              </div>
            ) : (
              "Pay Bill"
            )}
          </button>
        </form>
      );
    }

    // Airtime Form
    if (activeCategory === "airtime") {
      return (
        <form onSubmit={handlePayBill} className="space-y-5">
          <SelectField
            label="Network"
            name="serviceID"
            value={billForm.serviceID}
            onChange={handleBillFormChange}
            options={airtimeProviders}
          />
          <InputField
            label="Phone Number to Recharge"
            type="tel"
            name="billersCode"
            placeholder="08012345678"
            value={billForm.billersCode}
            onChange={handleBillFormChange}
            required
          />
          <InputField
            label="Amount (₦)"
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={billForm.amount}
            onChange={handleBillFormChange}
            min="50"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Processing payment...</span>
                </div>
                <span className="text-xs text-white/70">
                  This may take a few seconds
                </span>
              </div>
            ) : (
              "Buy Airtime"
            )}
          </button>
        </form>
      );
    }

    // Data Form
    if (activeCategory === "data") {
      const selectedNetwork = billForm.serviceID;
      const plans = selectedNetwork
        ? dataVariations[selectedNetwork] || []
        : [];
      const selectedPlan = plans.find(
        (p) => p.variation_code === billForm.variationCode,
      );

      return (
        <form onSubmit={handlePayBill} className="space-y-5">
          <SelectField
            label="Network"
            name="serviceID"
            value={billForm.serviceID}
            onChange={(e) => {
              handleBillFormChange(e);
              setBillForm((prev) => ({
                ...prev,
                serviceID: e.target.value,
                variationCode: "",
                amount: "",
              }));
            }}
            options={dataProviders}
          />

          <PlanTriggerButton
            label="Data Plan"
            selectedPlan={selectedPlan}
            disabled={!selectedNetwork}
            onClick={() => {
              setPlanModalConfig({ title: "Select Data Plan", plans });
              setPlanModalOpen(true);
            }}
          />

          <InputField
            label="Phone Number"
            type="tel"
            name="billersCode"
            placeholder="08012345678"
            value={billForm.billersCode}
            onChange={handleBillFormChange}
            required
          />

          <button
            type="submit"
            disabled={
              loading || !billForm.variationCode || !billForm.billersCode
            }
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Processing payment...</span>
                </div>
                <span className="text-xs text-white/70">
                  This may take a few seconds
                </span>
              </div>
            ) : (
              `Buy Data${billForm.amount ? ` — ₦${parseFloat(billForm.amount).toLocaleString()}` : ""}`
            )}
          </button>
        </form>
      );
    }

    // Cable TV Form
    if (activeCategory === "cable") {
      const selectedProvider = billForm.serviceID;
      const plans = selectedProvider
        ? cableVariations[selectedProvider] || []
        : [];
      const selectedPlan = plans.find(
        (p) => p.variation_code === billForm.variationCode,
      );

      return (
        <form onSubmit={handlePayBill} className="space-y-5">
          <SelectField
            label="Provider"
            name="serviceID"
            value={billForm.serviceID}
            onChange={(e) => {
              handleBillFormChange(e);
              setBillForm((prev) => ({
                ...prev,
                serviceID: e.target.value,
                variationCode: "",
                amount: "",
              }));
            }}
            options={cableProviders}
          />

          <PlanTriggerButton
            label="Subscription Package"
            selectedPlan={selectedPlan}
            disabled={!selectedProvider}
            onClick={() => {
              setPlanModalConfig({ title: "Select Package", plans });
              setPlanModalOpen(true);
            }}
          />

          <InputField
            label="Smart Card / Decoder Number"
            type="text"
            name="billersCode"
            placeholder="Enter smartcard number"
            value={billForm.billersCode}
            onChange={handleBillFormChange}
            required
          />

          <button
            type="submit"
            disabled={
              loading || !billForm.variationCode || !billForm.billersCode
            }
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Processing payment...</span>
                </div>
                <span className="text-xs text-white/70">
                  This may take a few seconds
                </span>
              </div>
            ) : (
              `Subscribe${billForm.amount ? ` — ₦${parseFloat(billForm.amount).toLocaleString()}` : ""}`
            )}
          </button>
        </form>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Bill Payment
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Fund your wallet and pay all your bills in one place
        </p>
      </div>

      <TestModeBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Category Selector */}
        <div className="lg:col-span-1 space-y-3">
          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-5 text-white">
            <p className="text-green-100 text-xs mb-1">Wallet Balance</p>
            <p className="text-2xl font-bold">
              ₦
              {walletBalance.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-1">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setBillForm({
                    serviceID: "",
                    billersCode: "",
                    variationCode: "",
                    amount: "",
                    phone: "",
                  });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeCategory === cat.id
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}
                >
                  <cat.icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">{cat.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {cat.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">
              {serviceCategories.find((c) => c.id === activeCategory)?.label}
            </h2>
            {renderForm()}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {successResult && (
        <SuccessModal
          result={successResult}
          onClose={() => setSuccessResult(null)}
        />
      )}

      {/* Plan Selector Modal */}
      <PlanSelectorModal
        isOpen={planModalOpen}
        onClose={() => setPlanModalOpen(false)}
        title={planModalConfig.title}
        plans={planModalConfig.plans}
        selectedValue={billForm.variationCode}
        onSelect={(plan) => {
          setBillForm((prev) => ({
            ...prev,
            variationCode: plan.variation_code,
            amount: plan.variation_amount,
          }));
        }}
      />
    </div>
  );
};

export default BillPayment;
