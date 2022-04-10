import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const FAQS = () => {
  return (
    <div>
      <Navbar />
      <div className="main1">
        <h3>FAQs : </h3>
        <p>
          Kindly check the FAQ below if you are not very familiar with the
          functioning of this website. If your query is of urgent nature and is
          different from the set of questions then do write to us at
          customerservice@bestcampgrounds.in or call us on 8268001714 between 10
          am & 5 pm on all days including Sunday to get our immediate help.
        </p>
        <h5>Registration : </h5>
        <h5>How do I register?</h5>
        <p>
          You can register by clicking on the “Rgister” link at the top right
          corner of the homepage. Please provide the information in the form
          that appears. You can review the terms and conditions, submit the
          registration information.
        </p>
      </div>
      <Footer />
    </div>
  );
};
export default FAQS;
