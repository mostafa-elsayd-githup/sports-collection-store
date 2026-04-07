"use client";
import { Card } from "react-bootstrap";
import styles from "./man_colliction.module.css";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // استيراد موديل الاوتو بلاي
import "swiper/css";
function Clube() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنميشن بالملي ثانية
      once: true, // الأنميشن يشتغل مرة واحدة بس وأنت نازل
    });
  }, []);

  return (
    <div data-aos="fade-up" className={styles.clubs}>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        className="mySwiper"
        // 2. فعل الموديلات هنا
        modules={[Autoplay]}
        // 3. ضبط إعدادات الأوتو بلاي
        autoplay={{
          delay: 3000, // 4 ثواني
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/mohhamed_salah.svg" />
            <Card.Body className={styles.card}>
              <h3 className={styles.title_clube}>
                TIMELESS Liverpool FC
              </h3>
              <p className={styles.title_clube}>
                Classical sports meets iconic style
              </p>

              <Link
                href={`/Components/Collection/man_colliction/shrat_clube_pages?club=Liverpool`}
                className={styles.Button}
              >
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>

        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/alahly_fc.svg" />
            <Card.Body className={styles.card}>
              <h3 className={styles.title_clube}>
                AL AHLY TTHIRD KIT 25/26
              </h3>
              <p className={styles.title_clube}>
                Bold & Briliant.
              </p>

              <Link
                href="/Components/Collection/man_colliction/shrat_clube_pages?club=alahly"
                className={styles.Button}
              >
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>

        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/real-madrid.svg" />
            <Card.Body className={styles.card}>
              <h3 className={styles.title_clube}>
                REAL MADRID 25/26 THIRD KIT
              </h3>
              <p className={styles.title_clube}>
                Originals blue takes on the Bernabéu
              </p>

              <Link
                href="/Components/Collection/man_colliction/shrat_clube_pages?club=Real Madrid"
                className={styles.Button}
              >
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>

        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/england.svg" />
            <Card.Body className={styles.card}>
              <h3 className={styles.title_clube}>
                MAN UTD 25/26 AWAY KIT
              </h3>
              <p className={styles.title_clube}>
                Legacy and style. Built for the road.
              </p>

              <Link
                href="/Components/Collection/man_colliction/shrat_clube_pages?club=Man United"
                className={styles.Button}
              >
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>

        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/bayern.svg" />
            <Card.Body className={styles.card}>
              <h3 className={styles.title_clube}>
                FC BAYERN 25/26 HOME KIT
              </h3>
              <p className={styles.title_clube}>
                Pride runs red.
              </p>

              <Link
                href="/Components/Collection/man_colliction/shrat_clube_pages?club=Bayern Munich"
                className={styles.Button}
              >
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>

        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img className={styles.img} variant="top" src="/arsenal.svg" />
            <Card.Body className={styles.card}>
              <h3 className={styles.title_clube}>
                ARSENAL 25/26 HOME KIT
              </h3>
              <p className={styles.title_clube}>
                The mark of legends.
              </p>

              <Link
                href="/Components/Collection/man_colliction/shrat_clube_pages?club=ArsenalClub"
                className={styles.Button}
              >
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default Clube;
