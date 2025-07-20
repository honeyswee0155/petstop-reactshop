import '../styles/Hero.css';

const Hero = () => {
  return (
    <header
      className="hero-banner"
      style={{
        backgroundImage:
          "url('https://i.shgcdn.com/cfa09014-0745-435f-9ce8-aa8d0d7c862d/-/format/auto/-/preview/3000x3000/-/quality/lighter/')",
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content text-center text-white">
          <h1>Welcome to PetStop Shop</h1>
        </div>
      </div>
    </header>
  );
};

export default Hero;
