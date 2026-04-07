"use client";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, faEnvelope, faShoppingBag, faHeart, 
  faMapMarkerAlt, faSignOutAlt, faEdit 
} from "@fortawesome/free-solid-svg-icons";
import styles from "./profile.module.css";
import NavBar from "../Navbar/navbar";

const ProfilePage = () => {
  // بيانات تجريبية (سيتم جلبها من السيرفر أو Redux لاحقاً)
  const user = {
    name: "Mostafa Elsayd",
    email: "user@example.com",
    address: "Cairo, Egypt",
    joinDate: "February 2024"
  };

  return (
    <>
    <NavBar/>
    <div className={styles.profileWrapper}>
      <Container className="py-5">
        <Row className="justify-content-center">
          {/* العمود الجانبي: صورة البروفايل والأكشن السريع */}
          <Col md={4} mb={4}>
            <Card className={styles.sideCard}>
              <Card.Body className={styles.card_body}>
                <div className={styles.avatarWrapper}>
                  <FontAwesomeIcon icon={faUser} className={styles.avatarIcon} />
                </div>
                <h4 className="fw-bold mt-3">{user.name}</h4>
                <p className={styles}>Member since {user.joinDate}</p>
                <Button variant="outline-dark" size="sm" className={styles.editbut}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Profile
                </Button>
                <Button variant="danger" size="sm" className="w-100 opacity-75">
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* العمود الأساسي: تفاصيل الحساب والنشاط */}
          <Col md={8}>
            <Card className={styles.mainCard}>
              <Card.Header className="">
                <h5 className="mb-0 fw-bold">Account Information</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className={styles.inputs}>
                  <Row>
                    <Col xs={4} className={styles}>Full Name</Col>
                    <Col xs={8} className="fw-semibold">{user.name}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className={styles.inputs}>
                  <Row>
                    <Col xs={4} className={styles}>Email Address</Col>
                    <Col xs={8} className="fw-semibold">{user.email}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className={styles.inputs}>
                  <Row>
                    <Col xs={4} className={styles}>Location</Col>
                    <Col xs={8} className="fw-semibold">{user.address}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* قسم إحصائيات سريعة أو روابط هامة */}
            <Row className="mt-4">
              <Col sm={6} className="mb-3">
                <Card className={styles.statCard}>
                  <Card.Body className={styles.Buttons}>
                    <div className={styles.statIconBox}>
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                    <div className="ms-3">
                      <h6 className={styles}>Orders</h6>
                      <span className="fw-bold h5">12</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} className="mb-3">
                <Card className={styles.statCard}>
                  <Card.Body className={styles.Buttons}>
                    <div className={`${styles.statIconBox} ${styles.heartIcon}`}>
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className="ms-3">
                      <h6 className={styles}>Wishlist</h6>
                      <span className="fw-bold h5">5</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default ProfilePage;