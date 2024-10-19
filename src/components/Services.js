import Card from "./Card";
function Services({services_1,  services_2, services_3}) {
  return (
    <div className="container services">
        <h2 className="main-title text-center">OUR SERVICES</h2>
        <div className="card-cover">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4 mb-2">
                    <Card title={services_1} img="female.jpg" text="We give you the Latest Fashion Ideas" />
                    </div>
                    <div className="col-md-4 mb-2">
                    <Card title={services_2} img="male.jpg" text="We give you the latests Fashion Ideas" />
                    </div>
                    <div className="col-md-4 mb-2">
                    <Card title={services_3} img="hair.jpg" text="Hair cream that norishes the hair Ideas" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Services;
