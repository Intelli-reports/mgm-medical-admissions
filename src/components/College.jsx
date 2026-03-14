import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Colleges() {
  const colleges = [
    {
      name: "Jawaharlal Nehru Medical College",
      image: "/public/image/campus-1.webp",
      placement: "800000",
      fees: "₹8640000.00",
    },
    {
      name: "Hamdard Institute of Medical Science",
      image:"/public/image/campus-1.webp",
      placement: "1000000",
      fees: "₹7200000.00",
    },
    {
      name: "SBK Shah Medical Institute & Research",
      image: "/public/image/campus-1.webp",
      placement: "12 lakh",
      fees: "₹10312500.00",
    },
    {
      name: "Santosh Medical College Ghaziabad",
      image: "/public/image/campus-1.webp",
      placement: "10 lakh",
      fees: "₹10800000.00",
    },
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Best Colleges of Medical</h2>

      <Row>
        {colleges.map((college, index) => (
          <Col md={3} key={index}>
            <Card className="shadow-sm border-0">

              <div style={{ position: "relative" }}>
                <Card.Img variant="top" src={college.image} />

                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "20px",
                    background: "#f7b500",
                    padding: "10px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                  }}
                >
                  Average placement : {college.placement}
                </div>
              </div>

              <Card.Body style={{ marginTop: "20px" }}>
                <Card.Title style={{ fontSize: "18px" }}>
                  {college.name}
                </Card.Title>

                <p>(MBBS)</p>

                <p>
                  <strong>Total Fees :</strong> {college.fees}
                </p>

                <Button variant="link" className="p-0">
                  Read More →
                </Button>
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Colleges;