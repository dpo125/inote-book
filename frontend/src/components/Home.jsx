
import Notes from "./Notes";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#FFF8F0", minHeight: "100vh", padding: "2rem 0" }}>
    
      
      {/* Notes Section */}
      <div className="container">
        <Notes />
      </div>
    </div>
  );
};

export default Home;