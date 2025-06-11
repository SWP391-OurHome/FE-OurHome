import React from 'react';
import Navbar from '../../components/Navigation/Header';
import Footer from '../../components/Footer/Footer';
import './Membership.css';

const Membership = () => {
  const plans = [
    {
      name: 'Silver',
      price: '5 triệu VND/tháng',
      description: 'Phù hợp cho người bán mới bắt đầu hành trình bất động sản.',
      benefits: [
        'Tối đa 10 tin đăng bất động sản',
        'Bảng điều khiển phân tích cơ bản',
        'Hỗ trợ qua email',
        'Truy cập mẫu chuẩn',
      ],
      color: '#e6f3ff',
      icon: 'star',
    },
    {
      name: 'Gold',
      price: '15 triệu VND/tháng',
      description: 'Lý tưởng cho doanh nghiệp đang phát triển cần nhiều sự tiếp cận.',
      benefits: [
        'Tối đa 50 tin đăng bất động sản',
        'Bảng điều khiển phân tích nâng cao',
        'Hỗ trợ qua email và chat ưu tiên',
        'Mẫu cao cấp',
        'Tin đăng nổi bật trên trang chủ',
      ],
      color: '#fff3e6',
      icon: 'trophy',
    },
    {
      name: 'Diamond',
      price: '30 triệu VND/tháng',
      description: 'Dành cho người bán hàng đầu tìm kiếm khả năng hiển thị và công cụ tối đa.',
      benefits: [
        'Tin đăng bất động sản không giới hạn',
        'Phân tích đầy đủ với báo cáo tùy chỉnh',
        'Hỗ trợ 24/7 chuyên dụng',
        'Mẫu độc quyền và thương hiệu',
        'Tin đăng nổi bật hàng đầu',
        'Truy cập chiến dịch marketing VIP',
      ],
      color: '#e6ffe6',
      icon: 'gem',
    },
  ];

  const faqs = [
    {
      question: 'Điều gì xảy ra nếu tôi hủy tư cách thành viên?',
      answer: 'Bạn có thể hủy bất cứ lúc nào, và tư cách thành viên sẽ vẫn hoạt động đến cuối chu kỳ thanh toán. Không hoàn tiền cho các tháng còn lại.',
    },
    {
      question: 'Tôi có thể nâng cấp hoặc giảm cấp gói không?',
      answer: 'Có, bạn có thể nâng cấp hoặc giảm cấp bất cứ lúc nào. Thay đổi có hiệu lực ngay lập tức, với hóa đơn được điều chỉnh theo tỷ lệ cho thời gian còn lại.',
    },
    {
      question: 'Có phí ẩn nào không?',
      answer: 'Không có phí ẩn. Giá hiển thị là tổng chi phí, bao gồm tất cả tính năng liệt kê trong gói bạn chọn.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="membership-container">
        {/* Banner Section */}
        <div className="banner-section">
          <img src="https://via.placeholder.com/1200x300" alt="Membership Banner" className="banner-image" />
          <div className="banner-content">
            <h1>Tin Tưởng Vào Thành Công Của Bạn</h1>
            <p>Khám phá các gói thành viên để nâng tầm kinh doanh bất động sản của bạn.</p>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="plans-section">
          <h2 className="section-title">Gói Thành Viên Nổi Bật</h2>
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className="plan-card" style={{ backgroundColor: plan.color }}>
                <div className="plan-header">
                  <i className={`bi bi-${plan.icon}`}></i>
                  <h3>{plan.name}</h3>
                </div>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">{plan.price}</div>
                <ul className="plan-benefits">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>
                      <i className="bi bi-check-circle"></i> {benefit}
                    </li>
                  ))}
                </ul>
                <button className="plan-button" onClick={() => alert(`Chọn gói ${plan.name}`)}>Chọn Gói</button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="section-title">Câu Hỏi Thường Gặp</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Membership;