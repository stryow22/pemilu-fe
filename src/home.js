import { Button, Card, Container, Form } from "react-bootstrap";
import NavigationBar from "./Components/Navbar";

const Home = () => {
    return (
        <>

<NavigationBar />

<div style={{ backgroundColor: "#F7F7F7", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Container>
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Pencarian Data Pemilih Pemilu</Card.Title>
        <Card.Text>
          Data Hasil Penetapan DPSHP oleh Kabupaten/Kota
        </Card.Text>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Nomor Induk Kependudukan/Paspor" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button variant="warning" size="lg">Pencarian</Button>
        </Form>

      </Card.Body>
    </Card>
  </Container>
</div>
        </>
    );
}

export default Home;
