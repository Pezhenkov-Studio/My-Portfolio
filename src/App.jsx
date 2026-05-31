import { useState, useEffect } from 'react';
export default function App() {
  const basePath = '/My-Portfolio';
  const projects = [
    {
      title: 'Современная кухня',
      images: [`${basePath}/kuhnia.jpg`]
    },
    {
      title: 'Тёплая гостиная',
      images: [`${basePath}/Gostishka.jpg`, `${basePath}/Gost-4.jpg`, `${basePath}/Gost_3.jpg`]
    },
    {
      title: 'Luxury ванная',
      images: [`${basePath}/bathroom.jpg`, `${basePath}/Vanna.jpg`]
    },
    {
      title: 'Ресторанный интерьер',
      images: [`${basePath}/resto_1.jpg`, `${basePath}/resto_2.jpg`, `${basePath}/resto_3.jpg`, `${basePath}/resto_4.jpg`, `${basePath}/resto_5.jpg`, `${basePath}/resto_6.jpg`]
    },
    {
      title: 'Игровое пространство',
      images: [`${basePath}/Londsh_1.jpg`, `${basePath}/Londsh_2.jpg`, `${basePath}/Londsh_3.jpg`]
    }
  ];

  const services = [
    { title: 'Дизайн интерьера', description: 'Создание гармоничного пространства вашего дома или офиса. Подбираем материалы, цветовую палитру, мебель и освещение, превращая ваше видение в реальность.', bgImage: '' },
    { title: 'Дизайн экстерьера', description: 'Проектирование фасадов и внешних пространств. Создаём привлекательный и функциональный облик здания, учитывая архитектурный стиль и окружающую среду.', bgImage: '' },
    { title: 'Ландшафтный дизайн', description: 'Озеленение и благоустройство придомовой территории. Разработаем концепцию сада, подберём растения и создадим уютную зону отдыха.', bgImage: '' },
    { title: 'Чертежи электрики и проводки', description: 'Профессиональная разработка схем электроснабжения. Безопасное и эффективное размещение розеток, выключателей и кабель-каналов с соблюдением всех норм.', bgImage: '' },
    { title: 'Сантехнические проекты', description: 'Планирование систем водоснабжения и водоотведения. Оптимальное размещение труб, радиаторов и сантехнических приборов для максимального комфорта.', bgImage: '' },
    { title: 'Световые решения и расстановка света', description: 'Создание идеального освещения для каждой зоны. Используем профессиональные источники света для атмосферы, функциональности и экономии энергии.', bgImage: '' }
  ];

  const reviews = [
    { text: 'Очень сильный подход к деталям. Получили интерьер именно таким, каким представляли его в голове. Всё выполнено профессионально и в срок.', author: 'Александр М.' },
    { text: 'Работать с командой было максимально комфортно. Всегда были на связи, предлагали интересные решения и сделали действительно дорогой интерьер.', author: 'Екатерина В.' },
    { text: 'Отдельно понравилось внимание к свету и материалам. Пространство получилось очень уютным и современным.', author: 'Роман К.' },
  ];

  const [showButton, setShowButton] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);

  const openModal = (project, startIndex = 0) => {
    setCurrentProject(project);
    setCurrentImageIndex(startIndex);
    setImageZoom(1);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    setImageZoom(1);
    document.body.style.overflow = 'auto';
  };

  const handleDoubleClickZoom = () => {
    setImageZoom((prev) => (prev === 1 ? 2.5 : 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? currentProject.images.length - 1 : prev - 1));
    setImageZoom(1);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === currentProject.images.length - 1 ? 0 : prev + 1));
    setImageZoom(1);
  };

    // Функции для свайпа (без использования события e)
  const onSwipeLeft = () => {
    if (currentProject && currentProject.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === currentProject.images.length - 1 ? 0 : prev + 1));
      setImageZoom(1);
    }
  };
  const onSwipeRight = () => {
    if (currentProject && currentProject.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? currentProject.images.length - 1 : prev - 1));
      setImageZoom(1);
    }
  };

  // Обработчики касаний
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      onSwipeLeft();   // свайп влево
    } else if (touchEndX - touchStartX > 50) {
      onSwipeRight();  // свайп вправо
    }
    // сброс
    setTouchStartX(0);
    setTouchEndX(0);
  };

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 450);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#f5f0e8] text-[#2b241f] min-h-screen font-sans overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d6b98c] flex items-center justify-center text-black font-bold">P</div>
            <span className="text-white tracking-[0.25em] text-sm uppercase">Pezhenkov Studio</span>
          </div> 
           <nav className="flex overflow-x-auto whitespace-nowrap gap-4 md:gap-8 text-white text-sm uppercase tracking-wider pb-2 relative" style={{ WebkitOverflowScrolling: 'touch' }}>
             <a href="#home" className="hover:text-[#d6b98c] transition shrink-0">Главная</a>
              <a href="#about" className="hover:text-[#d6b98c] transition shrink-0">Обо мне</a>
              <a href="#portfolio" className="hover:text-[#d6b98c] transition shrink-0">Портфолио</a>
              <a href="#services" className="hover:text-[#d6b98c] transition shrink-0">Услуги</a>
              <a href="#reviews" className="hover:text-[#d6b98c] transition shrink-0">Отзывы</a>
              <a href="#contacts" className="hover:text-[#d6b98c] transition shrink-0">Контакты</a>
           </nav>
        </div>
      </header>

      <section id="home" className="relative h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url('${basePath}/NaFon.jpg')`,  
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }} 
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 px-6 max-w-4xl">
          <p className="uppercase tracking-[0.4em] text-[#d8c1a1] mb-6 text-sm">Interior • Exterior • Landscape</p>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-8">Создаём пространства,
в которых хочется жить</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Премиальный дизайн интерьера, экстерьера и архитектурных решений. Современный минимализм, тёплые материалы и индивидуальный подход к каждому проекту.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#portfolio" className="px-8 py-4 bg-[#d6b98c] text-black rounded-full hover:scale-105 transition">Смотреть проекты</a>
            <a href="https://t.me/allli_alli" className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white hover:text-black transition">Связаться</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-28 px-6 bg-[#efe7dd]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>


<p className="uppercase tracking-[0.3em] text-[#9a7b56] mb-4 text-sm">Обо мне</p>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">Пеженков
Алимухаммад Викторович</h2>
            <div className="space-y-6 text-[#5b524a] text-lg leading-relaxed">
              <p>Занимаюсь дизайном интерьера, экстерьера и ландшафта. Работаю вместе с командой специалистов, создавая проекты, в которых сочетаются эстетика, комфорт и функциональность.</p>
              <p>За более чем 3 года опыта были реализованы разные проекты — от современных квартир до масштабных коммерческих пространств и ресторанов.</p>
              <p>Особое внимание уделяем свету, материалам, атмосфере и деталям. Каждый проект создаётся индивидуально под стиль жизни клиента.</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border border-[#d6b98c]/40 rounded-[40px]" />
            <img 
              src={`${basePath}/Aliha.jpg`}
              alt="Пеженков Алимухаммад Викторович" 
              className="relative rounded-[40px] shadow-2xl object-cover h-[650px] w-full" 
            />
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-28 px-6 bg-[#1f1a17] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="uppercase tracking-[0.3em] text-[#d6b98c] mb-4 text-sm">Портфолио</p>
            <h2 className="text-5xl font-light mb-6">Избранные проекты</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">Пространства, созданные с акцентом на минимализм, тепло материалов и премиальную атмосферу.</p>
          </div>
         <div className="grid md:grid-cols-2 gap-8"> 
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[32px] cursor-pointer"
                onClick={() => openModal(project, 0)}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-[500px] w-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-light">{project.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{project.images.length} фото</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-28 px-6 bg-[#f7f3ed]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="uppercase tracking-[0.3em] text-[#9a7b56] mb-4 text-sm">Услуги</p>
            <h2 className="text-5xl font-light">Что мы делаем</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="rounded-[32px] p-10 shadow-xl border border-[#e9ddd0] hover:-translate-y-2 transition bg-cover bg-center relative overflow-hidden"
                style={{ 
                  backgroundImage: service.bgImage ? `url(${service.bgImage})` : 'none', 
                  backgroundColor: service.bgImage ? 'transparent' : 'white' 
                }}
              >
                {/* Усиленное затемнение (80% черного) */}
                {service.bgImage && <div className="absolute inset-0 bg-black/80 rounded-[32px]"></div>}
                
                {/* Дополнительная тень для текста */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#d6b98c] mb-6" />
                  <h3 className="text-2xl font-light mb-4" style={{ color: service.bgImage ? 'white' : '#2b241f', textShadow: service.bgImage ? '1px 1px 3px black' : 'none' }}>{service.title}</h3>
                  <p className="leading-relaxed" style={{ color: service.bgImage ? 'white' : '#6a625b', textShadow: service.bgImage ? '0.5px 0.5px 2px black' : 'none' }}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-28 px-6 bg-[#201b18] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="uppercase tracking-[0.3em] text-[#d6b98c] mb-4 text-sm">Отзывы</p>
            <h2 className="text-5xl font-light">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-10">
                <p className="text-white/80 leading-relaxed mb-8 text-lg">“{review.text}”</p>
                <span className="text-[#d6b98c] tracking-wide">{review.author}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-28 px-6 bg-[#efe7dd]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-[#9a7b56] mb-4 text-sm">Контакты</p>
          <h2 className="text-5xl font-light mb-8">Давайте создадим
ваше идеальное пространство</h2>
          <p className="text-[#5b524a] text-lg mb-12 max-w-2xl mx-auto leading-relaxed">Свяжитесь с нами для обсуждения проекта. Подберём решения под ваш стиль, задачи и атмосферу, которую вы хотите получить.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:+789187431811" className="px-8 py-5 rounded-full bg-[#1f1a17] text-white hover:scale-105 transition">8 (918) 743-18-11</a>
            <a href="https://t.me/allli_alli" className="px-8 py-5 rounded-full border border-[#1f1a17]/20 hover:bg-[#1f1a17] hover:text-white transition">Telegram: @allli_alli</a>
            <a href="https://www.instagram.com/aliiii_27_10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="px-8 py-5 rounded-full border border-[#1f1a17]/20 hover:bg-[#1f1a17] hover:text-white transition">Instagram: @aliiii_27_10</a>
          </div>
        </div>
      </section>

      {isDesktop && showButton && (
        <button
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#2d2a27', // тёмно-серый/коричневый
            color: '#e5c89e',          // тёплый золотистый
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            fontSize: '26px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'opacity 0.2s, transform 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.9,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3f3a36';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2d2a27';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '0.9';
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ⇑
        </button>
      )}

    {isModalOpen && currentProject && (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={closeModal}
      >
        <div
          style={{
            position: 'relative',
            maxWidth: '90vw',
            width: '100%',
            maxHeight: '90vh',
            margin: '0 auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentProject.images[currentImageIndex]}
            alt={currentProject.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: '12px',
              transform: `scale(${imageZoom})`,
              transition: 'transform 0.3s ease',
              cursor: imageZoom > 1 ? 'grab' : 'pointer'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClickZoom}
          />

          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.3)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {currentProject.images.length > 1 && (
            <>
              {/* Стрелки показываем только на десктопе (ширина > 768px) */}
              {isDesktop && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.3)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>


                  <button
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.3)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>


                </>
              )}
              {/* Индикаторы (точки) показываем всегда */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px'
                }}
              >
                {currentProject.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    style={{
                      width: i === currentImageIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )}
    </div>
  );
}
