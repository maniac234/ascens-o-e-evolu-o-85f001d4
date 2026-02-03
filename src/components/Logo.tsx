import logoIcon from "@/assets/logo-icon.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img src={logoIcon} alt="Ascenção Logo" className="w-14 h-14 md:w-16 md:h-16" />
      <div className="text-left">
        <h1 className="font-display text-xl md:text-2xl font-bold tracking-wider text-gradient-gold">
          ASCENÇÃO
        </h1>
        <p className="font-display text-[8px] md:text-[10px] tracking-[0.3em] text-primary/60 uppercase">
          evolution
        </p>
      </div>
    </div>
  );
};

export default Logo;
