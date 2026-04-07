// src/pages/BlogDetailPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { legacyBlogs } from "../data/legacyBundleData";

function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const blogIndex = parseInt(id);
  const blog = legacyBlogs[blogIndex];

  if (!blog) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Blog not found!</h2>
        <button onClick={() => navigate("/blogs")} className="back-button">Go Back</button>
      </div>
    );
  }

  function blogTagClass(tag) {
    return `legacy-blog-tag legacy-blog-tag-${tag
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;
  }

  const getDetailedContent = () => {
    switch(blog.tag) {
      case "ADMISSIONS":
        return (
          <div className="detail-section">
            <h3>🎯 NEET UG Exam Overview</h3>
            <p>NEET (National Eligibility cum Entrance Test) is the single entrance examination for MBBS admissions in India. It consists of 180 multiple-choice questions from Physics, Chemistry, and Biology (Botany & Zoology). Total marks are 720, with each correct answer fetching 4 marks and 1 mark deducted for each wrong answer.</p>
            
            <h3>📋 Step-by-Step Admission Process</h3>
            <ul>
              <li><strong>Step 1:</strong> Register for NEET UG exam (Usually February-March)</li>
              <li><strong>Step 2:</strong> Appear for NEET exam (First week of May)</li>
              <li><strong>Step 3:</strong> Check results and cutoff (June)</li>
              <li><strong>Step 4:</strong> Register for MCC counseling (15% AIQ quota)</li>
              <li><strong>Step 5:</strong> Register for State counseling (85% state quota)</li>
              <li><strong>Step 6:</strong> Choice filling and locking preferences</li>
              <li><strong>Step 7:</strong> Seat allotment result declaration</li>
              <li><strong>Step 8:</strong> Document verification and fee payment</li>
              <li><strong>Step 9:</strong> Report to allotted college</li>
            </ul>

            <h3>📄 Required Documents Checklist</h3>
            <ul>
              <li>NEET 2025 Score Card and Admit Card</li>
              <li>Class 10th Marksheet and Certificate (Date of Birth proof)</li>
              <li>Class 12th Marksheet and Certificate</li>
              <li>Birth Certificate</li>
              <li>Caste Certificate (if applicable - SC/ST/OBC)</li>
              <li>Domicile Certificate (for state quota)</li>
              <li>Valid ID Proof (Aadhar Card/PAN Card/Passport)</li>
              <li>8-10 Passport size photographs</li>
            </ul>

            <h3>💰 Fee Structure (Per Year)</h3>
            <ul>
              <li><strong>Government Colleges:</strong> ₹10,000 - ₹50,000</li>
              <li><strong>Private Colleges:</strong> ₹5,00,000 - ₹25,00,000</li>
              <li><strong>NRI Quota:</strong> ₹25,00,000 - ₹1,00,00,000</li>
            </ul>

            <div className="highlight-box">
              <strong>💡 Pro Tip:</strong> Start your preparation early and focus on NCERT books as they are the best resource for NEET.
            </div>
          </div>
        );

      case "STUDENT LIFE":
        return (
          <div className="detail-section">
            <h3>⏰ Complete Daily Routine of an MBBS Student</h3>
            <p>Life of an MBBS student is challenging yet rewarding. Here's a typical day at MGM Medical College:</p>
            <ul>
              <li><strong>6:00 AM:</strong> Wake up, freshen up, and get ready</li>
              <li><strong>6:30 AM - 7:30 AM:</strong> Self-study or revision time</li>
              <li><strong>7:30 AM - 9:00 AM:</strong> Clinical rounds in wards</li>
              <li><strong>9:00 AM - 1:00 PM:</strong> Theory lectures and practicals</li>
              <li><strong>1:00 PM - 2:00 PM:</strong> Lunch break and relaxation</li>
              <li><strong>2:00 PM - 4:30 PM:</strong> OPD postings or ICU duties</li>
              <li><strong>4:30 PM - 7:00 PM:</strong> Self-study or library time</li>
              <li><strong>7:00 PM - 9:00 PM:</strong> Sports, gym, or recreation</li>
              <li><strong>9:00 PM onwards:</strong> Dinner and night study</li>
            </ul>

            <h3>🏠 Hostel Life Tips</h3>
            <p>Living in hostel is an integral part of medical education. Here are some tips to make your hostel life comfortable:</p>
            <ul>
              <li>Maintain a disciplined sleep schedule - 7-8 hours is mandatory</li>
              <li>Form a study group with motivated peers</li>
              <li>Build respectful relationships with seniors</li>
              <li>Keep your room clean and organized</li>
              <li>Participate in hostel mess committees</li>
            </ul>

            <h3>📚 Effective Study Tips for MBBS</h3>
            <ul>
              <li>Read standard textbooks (Harrison, Robbins, Guyton)</li>
              <li>Make short notes and flashcards for quick revision</li>
              <li>Watch YouTube videos for complex topics</li>
              <li>Solve previous year question papers regularly</li>
              <li>Attend all clinical postings - practical knowledge is key</li>
            </ul>

            <div className="highlight-box">
              <strong>🌟 Remember:</strong> Medical school is tough, but every patient interaction makes you a better doctor. Stay motivated!
            </div>
          </div>
        );

      case "CAREER GUIDANCE":
        return (
          <div className="detail-section">
            <h3>🎓 MD (Doctor of Medicine) - Non-Surgical Specializations</h3>
            <p>MD is a 3-year postgraduate degree focusing on non-surgical medical fields. It emphasizes diagnosis, treatment, and prevention of diseases using medications and therapies.</p>
            <ul>
              <li><strong>General Medicine:</strong> Diagnosis and treatment of adult diseases</li>
              <li><strong>Pediatrics:</strong> Medical care for infants, children, and adolescents</li>
              <li><strong>Radiology:</strong> Medical imaging and diagnosis (X-ray, CT, MRI)</li>
              <li><strong>Dermatology:</strong> Skin, hair, and nail disorders</li>
              <li><strong>Psychiatry:</strong> Mental health and behavioral disorders</li>
              <li><strong>Anesthesiology:</strong> Pain management and perioperative care</li>
            </ul>

            <h3>🔪 MS (Master of Surgery) - Surgical Specializations</h3>
            <p>MS is a 3-year postgraduate degree focusing on surgical procedures and operative techniques.</p>
            <ul>
              <li><strong>General Surgery:</strong> Abdominal surgeries, trauma, and emergency surgeries</li>
              <li><strong>Orthopedics:</strong> Bone, joint, and muscle surgeries</li>
              <li><strong>ENT (Otorhinolaryngology):</strong> Ear, nose, and throat surgeries</li>
              <li><strong>Ophthalmology:</strong> Eye surgeries and vision care</li>
              <li><strong>Obstetrics & Gynecology:</strong> Pregnancy, childbirth, and female reproductive system</li>
            </ul>

            <h3>📜 Diploma Courses (2 Years)</h3>
            <p>Diploma courses are practical-focused and shorter in duration compared to MD/MS. These are ideal for those who want to start practicing quickly.</p>
            <ul>
              <li><strong>DCH:</strong> Diploma in Child Health</li>
              <li><strong>DGO:</strong> Diploma in Obstetrics & Gynecology</li>
              <li><strong>DLO:</strong> Diploma in Otorhinolaryngology (ENT)</li>
              <li><strong>DMRD:</strong> Diploma in Medical Radio-Diagnosis</li>
            </ul>

            <h3>💡 How to Choose the Right Specialization?</h3>
            <ul>
              <li>Assess your personal interest (Do you like surgery or medicine?)</li>
              <li>Consider work-life balance requirements</li>
              <li>Research future earning potential and demand</li>
              <li>Check your NEET PG rank and seat availability</li>
              <li>Talk to seniors and practicing doctors in different fields</li>
            </ul>

            <div className="highlight-box">
              <strong>🎯 Career Tip:</strong> Choose a specialization based on your passion, not just earning potential. Job satisfaction is key in medical profession.
            </div>
          </div>
        );

      case "CLINICAL TRAINING":
        return (
          <div className="detail-section">
            <h3>🏥 Importance of OPD Training</h3>
            <p>OPD (Outpatient Department) is where students learn the art of patient interaction. It's the first point of contact between doctors and patients.</p>
            <ul>
              <li>Learn how to take detailed patient history</li>
              <li>Practice clinical examination techniques</li>
              <li>Observe common diseases and their presentations</li>
              <li>Understand doctor-patient communication</li>
            </ul>

            <h3>🚨 ICU & Emergency Training</h3>
            <p>ICU training prepares students for handling critical care situations and medical emergencies.</p>
            <ul>
              <li>Learn to handle medical emergencies (cardiac arrest, trauma, stroke)</li>
              <li>Master life-saving procedures (CPR, intubation, central line insertion)</li>
              <li>Monitor vital signs and manage ventilators</li>
              <li>Work under pressure and make quick decisions</li>
            </ul>

            <h3>🔬 Cadaver Dissection for Anatomy</h3>
            <p>Cadaver dissection is the most important part of learning anatomy. It gives 3D understanding of human body structures.</p>
            <ul>
              <li>Understand exact positions of organs and their relations</li>
              <li>Learn anatomical variations and anomalies</li>
              <li>Build confidence for surgical procedures</li>
              <li>Develop respect and empathy for human body</li>
            </ul>

            <div className="highlight-box">
              <strong>📝 Pro Tip:</strong> Always carry a pocket notebook during clinical postings. Note down interesting cases and discuss with your seniors.
            </div>
          </div>
        );

      case "WELLNESS":
        return (
          <div className="detail-section">
            <h3>⚠️ Common Mental Health Challenges</h3>
            <ul>
              <li><strong>Academic Pressure:</strong> Heavy syllabus, frequent exams, and high competition</li>
              <li><strong>Sleep Deprivation:</strong> Irregular duty hours and night shifts</li>
              <li><strong>Emotional Exhaustion:</strong> Dealing with patient suffering and death</li>
              <li><strong>Imposter Syndrome:</strong> Feeling inadequate despite achievements</li>
            </ul>

            <h3>🚨 Warning Signs of Burnout</h3>
            <ul>
              <li>Chronic fatigue and low energy throughout the day</li>
              <li>Difficulty concentrating on studies</li>
              <li>Irritability and frequent mood swings</li>
              <li>Loss of motivation and interest in studies</li>
              <li>Withdrawal from social activities and friends</li>
            </ul>

            <h3>💚 Practical Self-Care Strategies</h3>
            <ul>
              <li><strong>Sleep:</strong> Prioritize 7-8 hours of quality sleep daily</li>
              <li><strong>Exercise:</strong> 30 minutes of physical activity (yoga, running, gym)</li>
              <li><strong>Nutrition:</strong> Eat balanced meals and stay hydrated</li>
              <li><strong>Mindfulness:</strong> Practice meditation or deep breathing for 10 minutes</li>
              <li><strong>Social Connect:</strong> Stay connected with friends and family</li>
            </ul>

            <div className="highlight-box">
              <strong>🌟 Remember:</strong> Your mental health is as important as your grades. Taking care of yourself is not selfish - it's necessary for becoming a good doctor.
            </div>
          </div>
        );

      case "INFRASTRUCTURE":
        return (
          <div className="detail-section">
            <h3>🔬 Modern Laboratories at MGM</h3>
            <ul>
              <li><strong>Anatomy Lab:</strong> Well-ventilated lab with 3D models and cadaver storage</li>
              <li><strong>Physiology Lab:</strong> Advanced equipment for human experiments</li>
              <li><strong>Biochemistry Lab:</strong> Automated analyzers for blood and urine tests</li>
              <li><strong>Pathology Lab:</strong> Digital microscopes and histopathology equipment</li>
            </ul>

            <h3>📚 Central Library Facilities</h3>
            <ul>
              <li>10,000+ national and international medical journals (online access)</li>
              <li>24/7 reading room access for students</li>
              <li>E-books from standard authors (Harrison, Robbins, Bailey)</li>
              <li>Digital library with remote access facility</li>
            </ul>

            <h3>🏠 Hostel Accommodation</h3>
            <ul>
              <li>Separate hostels for boys and girls with adequate security</li>
              <li>24/7 security guards and CCTV surveillance</li>
              <li>High-speed Wi-Fi connectivity throughout campus</li>
              <li>Mess serving hygienic vegetarian and non-vegetarian food</li>
            </ul>

            <h3>⚽ Sports & Recreation Complex</h3>
            <ul>
              <li>Cricket ground with turf wicket and practice nets</li>
              <li>Football field with floodlights</li>
              <li>Basketball and volleyball courts</li>
              <li>Modern gymnasium with certified trainer</li>
            </ul>

            <div className="highlight-box">
              <strong>🏥 Campus Highlight:</strong> MGM has a 1,500+ bed multi-specialty hospital attached to the college, providing excellent clinical exposure.
            </div>
          </div>
        );

      case "STUDY ABROAD":
        return (
          <div className="detail-section">
            <h3>🌍 Popular Destinations for MBBS Abroad</h3>
            <ul>
              <li><strong>Russia:</strong> ₹20-40 Lakhs total (6 years including internship)</li>
              <li><strong>Philippines:</strong> ₹25-35 Lakhs total (5.5 years)</li>
              <li><strong>Bangladesh:</strong> ₹30-45 Lakhs total (5 years)</li>
              <li><strong>China:</strong> ₹25-40 Lakhs total (6 years)</li>
              <li><strong>Kyrgyzstan:</strong> ₹15-25 Lakhs total (5 years)</li>
            </ul>

            <h3>📝 FMGE (Foreign Medical Graduate Examination)</h3>
            <p>FMGE is mandatory for Indian students who complete MBBS abroad to practice in India. It is conducted twice a year by NBE (National Board of Examinations).</p>
            <ul>
              <li>Passing marks: 150 out of 300 (50%)</li>
              <li><strong>FMGE Passing Rates by Country:</strong> Russia: 15-20% | Philippines: 25-30% | Bangladesh: 35-40%</li>
            </ul>

            <h3>⚖️ India vs Abroad Comparison</h3>
            <ul>
              <li><strong>India Advantages:</strong> NMC recognition, excellent clinical exposure, no FMGE required</li>
              <li><strong>India Disadvantages:</strong> High competition for NEET, high fees in private colleges</li>
              <li><strong>Abroad Advantages:</strong> Lower fees in some countries, no entrance exam</li>
              <li><strong>Abroad Disadvantages:</strong> FMGE mandatory with low passing rates, language barrier</li>
            </ul>

            <div className="highlight-box">
              <strong>✅ Recommendation:</strong> Choose India if you can crack NEET with a good rank. Choose abroad only if NEET score is very low and you're fully prepared for FMGE.
            </div>
          </div>
        );

      case "EXAM GUIDE":
        return (
          <div className="detail-section">
            <h3>📚 6-Month NEET PG Study Plan</h3>
            <ul>
              <li><strong>Month 1-2 (Foundation):</strong> Subject-wise revision of all pre-clinical and clinical subjects</li>
              <li><strong>Month 3-4 (Practice):</strong> Daily MCQ practice (100-150 questions) with explanation</li>
              <li><strong>Month 5 (Testing):</strong> Mock tests every Sunday with detailed analysis</li>
              <li><strong>Month 6 (Revision):</strong> Focus on weak areas and high-yield topics</li>
            </ul>

            <h3>🎯 High-Yield Subjects (50% of Questions)</h3>
            <ul>
              <li><strong>Medicine:</strong> 20% (Cardiology, Neurology, Gastroenterology)</li>
              <li><strong>Surgery:</strong> 12% (General Surgery, Orthopedics, Neurosurgery)</li>
              <li><strong>Pediatrics:</strong> 9% (Growth, Development, Vaccination)</li>
              <li><strong>OB/GYN:</strong> 9% (Antenatal Care, Labor, Contraception)</li>
            </ul>

            <h3>📖 Best Resources and Books</h3>
            <ul>
              <li><strong>Standard Textbooks:</strong> Harrison (Medicine), Bailey (Surgery), Nelson (Pediatrics)</li>
              <li><strong>Question Banks:</strong> Marrow, PrepLadder, DAMS</li>
              <li><strong>Mobile Apps:</strong> NEET PG Prep, MedExam Prep, Marrow App</li>
            </ul>

            <div className="highlight-box">
              <strong>💡 Exam Tip:</strong> Solve 100-150 MCQs daily and take one mock test every Sunday. Analyze your mistakes and work on weak areas.
            </div>
          </div>
        );

      case "FINANCE":
        return (
          <div className="detail-section">
            <h3>💰 Government Scholarships</h3>
            <ul>
              <li><strong>Central Sector Scheme:</strong> For merit-cum-means students, up to ₹10 Lakhs per year</li>
              <li><strong>State Government Scholarships:</strong> Varies by state (EBC, OBC, SC/ST, etc.)</li>
              <li><strong>Minority Scholarships:</strong> For Muslim, Christian, Sikh, Buddhist, Jain students</li>
              <li><strong>Post-Matric Scholarship for SC/ST:</strong> Full tuition fee + maintenance allowance</li>
            </ul>

            <h3>🏦 Education Loans - Bank-wise Comparison</h3>
            <ul>
              <li><strong>SBI:</strong> Up to ₹50 Lakhs, 8.5-10% interest, no collateral up to ₹7.5 Lakhs</li>
              <li><strong>Bank of Baroda:</strong> Up to ₹40 Lakhs, 9-11% interest</li>
              <li><strong>Canara Bank:</strong> Up to ₹50 Lakhs, 8.75-10.5% interest</li>
              <li><strong>HDFC Bank:</strong> Up to ₹50 Lakhs, 10-12% interest</li>
            </ul>

            <h3>📄 Documents Required for Education Loan</h3>
            <ul>
              <li>NEET scorecard and rank letter</li>
              <li>Admission letter from medical college</li>
              <li>Fee structure document from college</li>
              <li>Income proof of parents (ITR, salary slips)</li>
              <li>KYC documents (Aadhar, PAN, Passport)</li>
            </ul>

            <div className="highlight-box">
              <strong>💡 Money Saving Tip:</strong> Apply for multiple scholarships simultaneously and take education loans from nationalized banks for lower interest rates.
            </div>
          </div>
        );

      default:
        return (
          <div className="detail-section">
            <h3>Key Highlights</h3>
            <ul>
              {blog.meta.split(" | ").map((item, idx) => (
                <li key={idx}>✓ {item}</li>
              ))}
            </ul>
            <p>For more detailed information, please contact our admission counseling team.</p>
          </div>
        );
    }
  };

  return (
    <section className="blog-detail-page">
      <div className="blog-detail-container">
        
        {/* Back Button */}
        <div className="back-button-wrap">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back to Blogs
          </button>
        </div>

        {/* Header */}
        <div className="blog-detail-header">
          <span className={blogTagClass(blog.tag)}>{blog.tag}</span>
          <h1>{blog.title}</h1>
          <div className="blog-meta-info">
            <span>📅 {blog.date}</span>
            <span>🔖 {blog.meta}</span>
          </div>
        </div>

        {/* Image - Full Width */}
        <div className="blog-featured-image">
          <img src={blog.image} alt={blog.title} />
        </div>

        {/* Content - Full Width (No Sidebar) */}
        <div className="blog-content-full">
          <div className="content-intro">
            <h2>Complete Information</h2>
            <p className="blog-excerpt-large">{blog.excerpt}</p>
          </div>

          {getDetailedContent()}

          {/* CTA Section */}
          <div className="cta-section">
            <h3>📌 Need Personalized Guidance?</h3>
            <p>Our expert admission counselors are here to help you with NEET preparation, college selection, and admission process.</p>
            <div className="cta-buttons">
              <button className="cta-primary">Contact Counselor</button>
              <button className="cta-secondary">Download Brochure</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailPage;