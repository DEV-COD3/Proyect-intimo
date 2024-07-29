import React, { useState, useEffect,useRef  } from 'react';
 // importing aos and WAVE para la ola en la web 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Wave from 'react-wavify'
// IMPORT Carousel OF PRIMERA REACT
import { Carousel } from 'primereact/carousel';       
// import axios para las consultas al server
import Axios from "axios";
// import BUTTON PRIMERA REACT
import { Button } from "primereact/button";
// import TAG primera REACT
import { Tag } from 'primereact/tag';
// libreari primeraReact img 
import { Image } from 'primereact/image';
        
 export const Index = ()=> {
    
      const responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];

      useEffect(() => {
        AOS.init();
      }, [])

      const [popular, setPopular] = useState([]); 

      useEffect(() => { 
        Axios.get('http://localhost:3000/getAllTrajes')
        .then((res) => { 
          setPopular(res.data);              
        })    
        .catch((err)=>{console.log(err)}) 
    
      }, []);

      const status = (product) => {
        switch (product.estado) {
          case 'disponible':
            return 'success';
          case 'agotado':
              return 'warning';      
          default:
            return null; 
        }
      };

  // template que me hace un carrusel libreria primeraReAct para mostrar tododos los trajes
    const productTemplate = (product) => {
      return (
          <div className="bg-white border-1 surface-border border-round m-2 text-center py-5 px-3">
              <div className="mb-3">          
                  <Image src={`../img/products/${product.routeImg}`}
                   zoomSrc={`../img/products/${product.routeImg}`} 
                   alt="Image" width="200" height="200" preview />                 
              </div>
              <div>
                  <h4 className="mb-1">{product.nameProduct}</h4>
                  <h6 className="mt-0 mb-3"> $ {product.precio}</h6>
                  <Tag value={product.estado} seversity={status(product)}></Tag>
                  <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                      <Button icon="pi pi-search" className="p-button p-button-rounded" />
                      <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                  </div>
              </div>
          </div>
      );
  };

//Template para mostrar los productos mas destacados
const moreEventTemplate = () => {console.log("hola");}

    return (
    <>
    <head>    
        <title>INTI SHOP</title>
        <link rel="stylesheet" href="../assets/css/web/bootstrap.css" />
        <link rel="stylesheet" href="../assets/css/web/styles.css" />
    </head>
   
    {/* <!-- ======= Header ======= --> */}
    <header id="header" className="fixed-top d-flex align-items-center header-scrolled header-transparent">
      <div className="container d-flex align-items-center justify-content-between">

        <div className="logo">         
          <h1><a href="/"><span>Intimo </span></a></h1>
        </div>

        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
            <li><a className="nav-link scrollto" href="#about">About</a></li>
            <li><a className="nav-link scrollto" href="#gallery">Trajes</a></li>
            <li><a className="nav-link scrollto" href="#team">Mas Vendidos </a></li>
            <li><a className="nav-link scrollto" href="#descuentosDay">Descuentos</a></li>
            <li><a className="nav-link scrollto" href="#contact">Contactanos</a></li>
            <li><a className="nav-link scrollto" href="/login">Admin</a></li>
            {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><a href="#">Drop Down 1</a></li>
                <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                  <ul>
                    <li><a href="#">Deep Drop Down 1</a></li>
                    <li><a href="#">Deep Drop Down 2</a></li>
                    <li><a href="#">Deep Drop Down 3</a></li>
                    <li><a href="#">Deep Drop Down 4</a></li>
                    <li><a href="#">Deep Drop Down 5</a></li>
                  </ul>
                </li>
                <li><a href="#">Drop Down 2</a></li>
                <li><a href="#">Drop Down 3</a></li>
                <li><a href="#">Drop Down 4</a></li>
              </ul>
            </li> */}
           
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
        {/* <!-- .navbar --> */}

      </div>
    </header>
   {/* <!-- End Header --> */}
    <section id="hero">
      
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
          <div data-aos="zoom-out" className='neon'>
            <h1>Bienvenido a nuestra <span>Sex Shop</span></h1>
            <h2>Tenemos gran variedadiu de productos y de muy buena calidad</h2>
            <div className="text-center text-lg-start">
              <a href="#about" className="btn-get-started scrollto"> A poco precio, miralos!</a>
            </div>
          </div>
        </div>
        <div className=" col-lg-4 order-1 order-lg-2 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="300">
          <img src="../img/web/hero-img.png" className="img-fluid animated" alt=""/>          
        </div>
   
      </div>
    </div>
    
    <Wave 
      fill= ' white'    
      paused={false}
      style={{ display: 'flex' , position: 'absolute',bottom:0,opacity: .9 }}
      options={{
        height: 20,
        amplitude: 100,
        speed: 0.15,
        points: 3
       }}
      />
    </section> 
   
    <main id="main">

    {/* <!-- ======= About Section ======= --> */}
    <section id="about" className="about">
      <div className="container-fluid">

        <div className="row">
          <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch" data-aos="fade-right">
            <a href="https://www.youtube.com/watch?v=StpBR2W8G5A" className="glightbox play-btn mb-4"></a>
          </div>

          <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" data-aos="fade-left">
            <h3>Enim quis est voluptatibus aliquid consequatur fugiat</h3>
            <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium. Soluta voluptate sed facere corporis dolores excepturi. Libero laboriosam sint et id nulla tenetur. Suscipit aut voluptate.</p>

            <div className="icon-box" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon"><i className="bx bx-fingerprint"></i></div>
              <h4 className="title"><a href="">Lorem Ipsum</a></h4>
              <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            </div>

            <div className="icon-box" data-aos="zoom-in" data-aos-delay="200">
              <div className="icon"><i className="bx bx-gift"></i></div>
              <h4 className="title"><a href="">Nemo Enim</a></h4>
              <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
            </div>

            <div className="icon-box" data-aos="zoom-in" data-aos-delay="300">
              <div className="icon"><i className="bx bx-atom"></i></div>
              <h4 className="title"><a href="">Dine Pad</a></h4>
              <p className="description">Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
            </div>

          </div>
        </div>

      </div>
    </section> 

    {/* <!-- ======= Features Section ======= --> */}
    <section id="features" className="features">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>Check The Features</p>
        </div>

        <div className="row" data-aos="fade-left">
          <div className="col-lg-3 col-md-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="50">
              <i className="ri-store-line" style={{color:'#ffbb2c'}} ></i>
              <h3><a href="">Lorem Ipsum</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="100">
              <i className="ri-bar-chart-box-line" style={{color:'#5578ff'}} ></i>
              <h3><a href="">Dolor Sitema</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="150">
              <i className="ri-calendar-todo-line" style={{color:'#e80368'}}></i>
              <h3><a href="">Sed perspiciatis</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="200">
              <i className="ri-paint-brush-line" style={{color:'#e361ff'}}></i>
              <h3><a href="">Magni Dolores</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="250">
              <i className="ri-database-2-line"style={{color:'#47aeff'}}></i>
              <h3><a href="">Nemo Enim</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="300">
              <i className="ri-gradienter-line"style={{color:'#ffa76e'}}></i>
              <h3><a href="">Eiusmod Tempor</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="350">
              <i className="ri-file-list-3-line"style={{color:'#11dbcf'}}></i>
              <h3><a href="">Midela Teren</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="400">
              <i className="ri-price-tag-2-line" style={{color:'#4233ff'}}></i>
              <h3><a href="">Pira Neve</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="450">
              <i className="ri-anchor-line"style={{color:'#b2904f'}}></i>
              <h3><a href="">Dirada Pack</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="500">
              <i className="ri-disc-line" style={{color:'#ffbb2c'}}></i>
              <h3><a href="">Moton Ideal</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="550">
              <i className="ri-base-station-line"style={{color:'#ff5828'}}></i>
              <h3><a href="">Verdo Park</a></h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box" data-aos="zoom-in" data-aos-delay="600">
              <i className="ri-fingerprint-line" style={{color:'#29cc61'}}  ></i>
              <h3><a href="">Flavor Nivelanda</a></h3>
            </div>
          </div>
        </div>

      </div>
    </section> 

    {/* <!-- ======= Counts Section ======= --> */}
    <section id="counts" className="counts">
      <div className="container">

        <div className="row" data-aos="fade-up">

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-emoji-smile"></i>
              <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
              <p>Happy Clients</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
              <i className="bi bi-journal-richtext"></i>
              <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
              <p>Projects</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="bi bi-headset"></i>
              <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter"></span>
              <p>Hours Of Support</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="bi bi-people"></i>
              <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span>
              <p>Hard Workers</p>
            </div>
          </div>

        </div>

      </div>
    </section> 

    {/* <!-- ======= Details Section ======= --> */}
    <section id="details" className="details">
      <div className="container">

        <div className="row content">
          <div className="col-md-4" data-aos="fade-right">
            <img src="../img/web/details-1.png" className="img-fluid" alt=""/>
          </div>
          <div className="col-md-8 pt-4" data-aos="fade-up">
            <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <ul>
              <li><i className="bi bi-check"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li><i className="bi bi-check"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
              <li><i className="bi bi-check"></i> Iure at voluptas aspernatur dignissimos doloribus repudiandae.</li>
              <li><i className="bi bi-check"></i> Est ipsa assumenda id facilis nesciunt placeat sed doloribus praesentium.</li>
            </ul>
            <p>
              Voluptas nisi in quia excepturi nihil voluptas nam et ut. Expedita omnis eum consequatur non. Sed in asperiores aut repellendus. Error quisquam ab maiores. Quibusdam sit in officia
            </p>
          </div>
        </div>

        <div className="row content">
          <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
            <img src="../img/web/details-2.png" className="img-fluid" alt=""/>
          </div>
          <div className="col-md-8 pt-5 order-2 order-md-1" data-aos="fade-up">
            <h3>Corporis temporibus maiores provident</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum
            </p>
            <p>
              Inventore id enim dolor dicta qui et magni molestiae. Mollitia optio officia illum ut cupiditate eos autem. Soluta dolorum repellendus repellat amet autem rerum illum in. Quibusdam occaecati est nisi esse. Saepe aut dignissimos distinctio id enim.
            </p>
          </div>
        </div>
     
      </div> 
    </section> 
    {/* <!-- ======= MORE POPULY ======= --> */}
    <section id="gallery" className="gallery">
      <div className="container">

        <div className="section-title" data-aos="fade-up">         
          <p>Trajes</p>
        </div>
     </div>
        <div className="card bg-dark " >
            <Carousel value={popular} 
              numVisible={4} 
              // numScroll={2} 
              responsiveOptions={responsiveOptions} 
              className="custom-carousel" 
              circular
              autoplayInterval={3000} 
              itemTemplate={productTemplate} 
            />
        </div>    
    </section> 

    {/* <!-- ======= info Section ======= --> */}
    <section id="info" className="testimonials">
      <div className="container">

        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

            <div className="swiper-slide">
              <div className="testimonial-item">
                <img src="../img/web/testimonials/testimonials-1.jpg" className="testimonial-img" alt=""/>                                 
              </div>
            </div>     
            <div className="swiper-slide">
              <div className="testimonial-item">
                <img src="../img/web/testimonials/testimonials-3.jpg" className="testimonial-img" alt=""/>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="testimonial-item">
                <img src="../img/web/testimonials/testimonials-4.jpg" className="testimonial-img" alt=""/>                                
              </div>
            </div> 
            <div className="swiper-slide">
              <div className="testimonial-item">
                <img src="../img/web/testimonials/testimonials-5.jpg" className="testimonial-img" alt=""/>                                
              </div>
            </div> 
            <div className="swiper-slide">
              <div className="testimonial-item">
                <img src="../img/web/testimonials/testimonials-5.jpg" className="testimonial-img" alt=""/>                                
              </div>
            </div> 
            <div className="swiper-slide">
              <div className="testimonial-item">
                <img src="../img/web/testimonials/testimonials-5.jpg" className="testimonial-img" alt=""/>                                
              </div>
            </div> 

          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section> 

    {/* <!-- ======= Team Section ======= --> */}
    <section id="team" className="team">
      <div className="container">

        <div className="section-title" data-aos="fade-up">          
          <h2>Nuestros productos mas Destacados</h2>
        </div>

        <div className="row" data-aos="fade-left">
          <div className="col-lg-3 col-md-6">
            <div className="member" data-aos="zoom-in" data-aos-delay="100">
              <div className="pic"><img src="../img/web/team/team-1.jpg" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>Walter White</h4>
                <span>Chief Executive Officer</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="member" data-aos="zoom-in" data-aos-delay="200">
              <div className="pic"><img src="../img/web/team/team-2.jpg" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Product Manager</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="member" data-aos="zoom-in" data-aos-delay="200">
              <div className="pic"><img src="../img/web/team/team-2.jpg" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Product Manager</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="member" data-aos="zoom-in" data-aos-delay="200">
              <div className="pic"><img src="../img/web/team/team-2.jpg" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Product Manager</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="member" data-aos="zoom-in" data-aos-delay="200">
              <div className="pic"><img src="../img/web/team/team-2.jpg" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Product Manager</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="member" data-aos="zoom-in" data-aos-delay="300">
              <div className="pic"><img src="../img/web/team/team-3.jpg" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>William Anderson</h4>
                <span>CTO</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="member" data-aos="zoom-in" data-aos-delay="300">
              <div className="pic"><img src="../img/web/team/team-3.jpg" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>William Anderson</h4>
                <span>CTO</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* <!-- ======= Pricing Section ======= --> */}
    <section id="descuentosDay" className="pricing">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>Descuentos</h2>
          <p>Mira nuestros descuentos</p>
        </div>

        <div className="row" data-aos="fade-left">

          <div className="col-lg-3 col-md-6">
            <div className="box" data-aos="zoom-in" data-aos-delay="100">
              <h3>Free</h3>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li className="na">Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
            <div className="box featured" data-aos="zoom-in" data-aos-delay="200">
              <h3>Business</h3>
              <h4><sup>$</sup>19<span> / month</span></h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay="300">
              <h3>Developer</h3>
              <h4><sup>$</sup>29<span> / month</span></h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay="400">
              <span className="advanced">Advanced</span>
              <h3>Ultimate</h3>
              <h4><sup>$</sup>49<span> / month</span></h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section> 

    {/* <!-- ======= F.A.Q Section =======  */}
    <section id="faq" className="faq section-bg">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>F.A.Q</h2>
          <p>Frequently Asked Questions</p>
        </div>

        <div className="faq-list">
          <ul>
            <li data-aos="fade-up">
              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1">Non consectetur a erat nam at lectus urna duis? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
                <p>
                  Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="100">
              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-2" className="collapsed">Feugiat scelerisque varius morbi enim nunc? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-2" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="200">
              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-3" className="collapsed">Dolor sit amet consectetur adipiscing elit? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-3" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="300">
              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-4" className="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-4" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="400">
              <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-5" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-5" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque.
                </p>
              </div>
            </li>

          </ul>
        </div>

      </div>
    </section> 

    {/* <!-- ======= Contact Section ======= --> */}
    <section id="contact" className="contact">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </div>

        <div className="row">

          <div className="col-lg-4" data-aos="fade-right" data-aos-delay="100">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>

              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>

            </div>

          </div>

          <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">

            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required/>
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required/>
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>

          </div>

        </div>

      </div>
    </section> 
    </main> 
  
    </>
  ) 
}
 
