const Navbar = () => {
  return (
    <header>
      <nav className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">React Todo App</span>
          </div>
          <div>
            <a href="https://github.com/jeferson0993" className="hover:text-secondary transition-colors">GitHub</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;