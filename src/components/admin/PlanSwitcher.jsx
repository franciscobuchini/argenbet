// PlanSwitcher.jsx
const PlanSwitcher = ({ currentPlan }) => {
  const plans = [
    {
      key: "free",
      name: "Gratis",
      details: [
        "Solo podrás delegar usuarios a tu plataforma principal",
        "No podrás activar ni desactivar otras plataformas"
      ]
    },
    {
      key: "pro",
      name: "Pro",
      details: ["Control total sobre tu sitio web"]
    }
  ];

  const renderProButton = () => {
    if (currentPlan === "trial") return "Accede a la versión Pro";
    if (currentPlan === "free") return "Accede a la versión Pro";
    if (currentPlan === "pro") return "Versión actual";
  };

  return (
    <div className="mb-8">
      <h3 className="text-center font-semibold m-6 text-white text-xl">Tu plan actual es:</h3>
      <div className="flex flex-col sm:flex-row gap-6">
        {plans.map(plan => {
          const isActive = plan.key === currentPlan || (plan.key === "pro" && currentPlan === "trial");
          return (
            <div
              key={plan.key}
              className={`
                flex-1 p-6 rounded-xl border-2 flex flex-col justify-between
                transition-transform duration-300 ease-in-out
                ${isActive ? "border-violet-500 bg-violet-900/40 shadow-lg" : "border-white/20 bg-white/5"}
                hover:scale-101 hover:shadow-2xl
              `}
            >
              <div>
                <h4 className="font-bold mb-4 text-lg">{plan.name}</h4>
                <ul className="text-sm text-white/80 list-disc list-inside space-y-2">
                  {plan.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {plan.key === "pro" && (
                <div className="mt-4 flex flex-col items-start">
                  {currentPlan === "trial" && (
                    <p className="text-xs text-white/70 mb-2">
                      Actualmente estás en un período de prueba gratuita durante 15 días
                    </p>
                  )}
                  <button
                    className={`
                      py-3 px-4 rounded-lg font-semibold text-white text-sm
                      transition-all duration-300 justify-center w-full
                      ${currentPlan === "pro" ? "bg-white/10 cursor-default opacity-80" : "bg-violet-500 hover:bg-violet-600 shadow-lg"}
                    `}
                  >
                    {renderProButton()}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanSwitcher;
