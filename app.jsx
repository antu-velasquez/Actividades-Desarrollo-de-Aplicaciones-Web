import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const FormularioContenido = () => (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Nombre de la tarea</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Descripción</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Fecha límite</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
      <Button variant="primary" className="w-100">Guardar tarea</Button>
    </Form>
  );

  return (
    <div className="main-wrapper">
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#" className="fw-bold">To Do List</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link href="#tareas" active>Tareas</Nav.Link>
            <Nav.Link href="#metas">Metas</Nav.Link>
          </Nav>
          <div className="d-lg-none mt-3">
            <Button variant="primary" className="w-100" onClick={handleShow}>
              + Nueva tarea
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="py-4 px-lg-5">
        <Row>
          <Col lg={4} className="d-none d-lg-block">
            <Card className="shadow-sm p-4 sticky-top">
              <h4 className="mb-4 fw-bold">Nueva tarea</h4>
              <FormularioContenido />
            </Card>
          </Col>

          <Col xs={12} lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold text-secondary">Tareas</h3>
              <span className="badge bg-primary rounded-pill">1 Pendiente</span>
            </div>
            
            <Card className="tarea-item shadow-sm mb-3">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1 fw-bold">Leer material del curso de Desarrollo</h5>
                  <p className="text-muted mb-2">Leer la documentación de la semana del curso de Desarrollo de Aplicaciones Web.</p>
                  <p className="text-muted small mb-0">Vence: 2026-04-30</p>
                </div>
                <Button variant="outline-success" className="rounded-pill">Completado</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered className="d-lg-none">
        <Modal.Header closeButton>
          <Modal.Title>Agregar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioContenido />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;