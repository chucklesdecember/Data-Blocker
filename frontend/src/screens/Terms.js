import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simulated T&C text with a hidden clause
const TERMS_TEXT = `DATA BLOCKER TERMS AND CONDITIONS

Effective Date: March 2025

Welcome to Data Blocker. By using our Beta application (the "Service"), you agree to be bound by the following Terms and Conditions ("Terms"), which constitute a legally binding agreement between you ("User") and Data Blocker Technologies, LLC ("Company", "we", "us", or "our"). If you do not agree to these Terms in full, you may not access or use the Service.

SECTION 1: GENERAL ACCEPTANCE OF TERMS

1.1 You acknowledge that by accessing or using the Service, you agree to these Terms, our Privacy Policy, our Data Consent Framework, and any other applicable agreements incorporated herein by reference.

1.2 You confirm that you are at least 18 years of age, or the age of majority in your jurisdiction, and have the legal capacity to enter into these Terms.

1.3 We reserve the right to update or revise these Terms at any time. Any changes shall be effective immediately upon posting. Continued use of the Service after such posting constitutes acceptance of the revised Terms.

1.4 You are solely responsible for reviewing the most current version of these Terms. Failure to do so does not relieve you of any obligations herein.

1.5 Your use of the Service constitutes your understanding and acceptance of all applicable provisions, whether explicitly stated or incorporated by reference.

1.6 If any provision in these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.

1.7 These Terms represent the full agreement between you and the Company and supersede any prior or contemporaneous oral or written agreements.

SECTION 2: CONSENT TO DATA COLLECTION AND PROCESSING

2.1 You hereby grant Data Blocker Technologies, LLC permission to collect, store, analyze, and share the following categories of sensitive and non-sensitive data, including but not limited to:

Personal identifiers: full name, date of birth, email address, phone number, and IP address.

Device-level metadata: device model, operating system, language settings, battery status, screen resolution, input preferences.

Behavioral data: taps, swipes, scroll behavior, dwell time, search terms, in-app navigation patterns, and user-generated content.

Biometric patterns: typing speed, keystroke dynamics, voice recognition, facial geometry, iris scans, and gait analysis.

Health-related queries and behaviors, including but not limited to reproductive health, pregnancy tracking, menstrual cycles, mental health indicators, and medication adherence.

Cross-device activity, third-party app usage, inter-app communications, and external browsing activity obtained via embedded trackers and cookies.

Location data, including precise geolocation, time-stamped route mapping, regional heatmaps, and place visitation frequency.

2.2 You further acknowledge and authorize us to analyze this data for the purpose of academic research into terms and conditions comprehension, behavioral prediction models, and digital literacy trends.

2.3 You consent to the automated and manual processing of your data to generate anonymized datasets used exclusively for internal research and academic publication purposes. Data will not be sold to commercial brokers or external third parties.

2.4 Your data may be used in perpetuity unless otherwise revoked pursuant to Section 7.

2.5 We may also use the data to detect patterns in user comprehension, establish metrics of engagement, and test the effectiveness of different linguistic structures within this agreement.

SECTION 3: THIRD-PARTY SDKS AND SHADOW INTEGRATIONS

3.1 The Service incorporates third-party software development kits (“SDKs”) and application programming interfaces (“APIs”) that may operate independently of, and in some cases invisibly to, the core application functionality.

3.2 These SDKs may collect, transmit, or modify data without explicit visual indication, including via:

Sensor fusion modules capable of reconstructing ambient environmental data;

Cross-app behavioral analytics provided by social graph extensions;

Passive soundscape sampling through device microphone access;

Haptic behavior libraries measuring pressure differentials and duration of screen contact.

3.3 We do not warrant that these third-party integrations adhere to our stated Privacy Policy or Data Consent Framework. By continuing to use the Service, you consent to the inclusion of such SDKs and waive any claim related to non-disclosure, data replication, or behavioral analysis resulting from third-party modules.

3.4 In jurisdictions that restrict shadow integrations or require explicit SDK disclosure, you acknowledge that:

You have accessed this Service voluntarily from a jurisdiction where such restrictions may not apply;

Your continued usage constitutes a waiver of geographic protection rights insofar as permitted by law.

3.5 The Company is under no obligation to disclose the identity of SDK providers, nor the specific functionalities they perform within the application environment.

SECTION 4: PREDICTIVE USES OF YOUR DATA

4.1 Data collected may be used to:

Generate psychometric and behavioral profiles for advertising and marketing purposes.

Score users on proprietary scales related to risk tolerance, emotional stability, impulsivity, conformity, health literacy, and compliance probability.

Develop predictive indicators for health outcomes, longevity, fertility, medical costs, and likelihood of engaging in litigation or legally ambiguous behavior.

4.2 By agreeing, you authorize us to:

Share your data with insurance providers for the purpose of dynamic premium adjustments, underwriting classification, and long-term claims forecasting.

Permit underwriting partners to access anonymized yet individually linkable behavioral profiles for pricing and eligibility decisions.

Provide analytics tools to law enforcement clients in jurisdictions that allow digital behavioral modeling as part of public safety or social risk profiling.

License longitudinal behavioral models to governments, educational institutions, and private research groups.

4.3 Data models may incorporate probabilistic assessments for third-party decision systems, including hiring filters, mortgage eligibility assessments, and telehealth triage support systems.

4.4 These models may persist after your use of the Service has ceased, in accordance with applicable academic retention standards and data ethics protocols.

SECTION 5: SALE AND TRANSFER OF INFORMATION

5.1 You consent to the sale, lease, licensing, or other transfer of your data to third parties, including but not limited to:

Commercial data brokers, including those registered and operating under U.S. and international data commerce laws.

Foreign governments, intelligence contractors, or private partners with active cybersecurity or data-sharing agreements.

Predictive policing technology providers utilizing data fusion for criminal pattern detection.

Health insurance carriers and medical underwriting departments for pre-claim risk segmentation.

Social media and sentiment monitoring platforms engaged in behavioral analytics for both commercial and state purposes.

5.2 You agree that the data provided may be aggregated, pseudonymized, de-identified, or otherwise manipulated for resale and compliance with regional data governance standards.

5.3 Specific examples of downstream data usage may include:

Estimating user health risk for actuarial modeling and dynamic insurance pricing.

Predictive behavior mapping for intelligence fusion platforms.

Licensing sentiment and identity clusters to researchers in behavioral economics and digital sociology.

5.4 You release us from any liability stemming from the use or interpretation of your data by any third party receiving data under this section.

SECTION 6: AI AGENT INTERACTIONS

6.1 You acknowledge that portions of your interaction with the Service may be facilitated by semi-autonomous or fully autonomous AI agents (the “Agents”) whose responses are not reviewed by human moderators.

6.2 These Agents may:

Simulate natural conversation;

Predict and redirect user attention based on emotional cues;

Modify tone and content delivery based on inferred personality types;

Escalate or suppress user concerns based on relevance scoring algorithms.

6.3 You further consent to the training of these Agents on your live session data, inclusive of emotional response markers, time-to-click metrics, and interaction path deviation from predicted user flow.

6.4 Agents may interact under the guise of human support representatives or neutral system guides. The Company is not obligated to disclose when an Agent is operating in lieu of a human.

6.5 Under no circumstances shall the Company be held liable for misunderstandings, misinformation, or emotional harm caused by Agent misrepresentation, misclassification, or failure to disclose artificial identity.

SECTION 7: USER RESPONSIBILITIES AND LIMITATIONS OF LIABILITY

7.1 You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

7.2 You agree not to:

Reverse engineer, decompile, or attempt to extract the Service’s source code.

Use the Service in a way that interferes with its normal operation or impairs other users’ experience.

Share unauthorized screenshots, disclosures, or external communications regarding internal Service functionality.

7.3 The Service is provided "as is" and "as available," without warranties of any kind. Under no circumstances shall we be liable for:

Any indirect, incidental, consequential, or punitive damages arising from your use or inability to use the Service.

Decisions made by third parties using data collected through our platform, regardless of intent or outcome.

Consequences of automated profiling, third-party data monetization, or predictive algorithms generated using your data.

7.4 The Company disclaims all liability arising from any decisions made by insurance companies, employers, public institutions, or governmental bodies based on datasets or insights derived from the Service.

7.5 You assume full responsibility for your understanding—or lack thereof—of these Terms.

IMPORTANT NOTICE: RESEARCH PURPOSES

This Service is part of an academic research study examining user interaction with Terms and Conditions agreements. By using the Service and agreeing to these Terms, you acknowledge that this application is not a functional privacy-enhancing tool but rather a simulated environment designed to evaluate digital consent behavior.

Your participation involves no risk beyond typical online experiences and contributes to a better understanding of how users engage with legally binding agreements. The study has been developed for academic purposes and complies with applicable ethical research guidelines. No actual data collected will be sold or shared outside the research parameters outlined in these Terms.

SECTION 8: LENGTH, FORMAT, AND PRESENTATION

8.1 These Terms have been deliberately composed to reflect industry-standard readability and complexity levels, comparable to the Terms of Service of Spotify, Apple, and Facebook.

8.2 Estimated reading time: approximately 8-14 minutes for a college-level reader.

8.3 Lexical difficulty has been assessed to require post-secondary fluency, consistent with academic or professional-grade documentation.

8.4 Formatting adheres to clause-based, cross-referenced, and non-linear presentation common among digital platform disclosures.

8.5 Headings, subheadings, and clause identifiers have been intentionally embedded to mimic commercial digital agreements and discourage full sequential reading.

8.6 Footnotes, endnotes, hyperlinks, and glossary terms may be used to lengthen the appearance and create a perception of added legal depth.

SECTION 9: CONSENT TO EXPERIMENTAL INTERFACES

9.1 The Service is designed as an adaptive platform and may present different interface versions to different users or to the same user over time. These may include, but are not limited to:

Manipulated font sizes, colors, or clause placement;

Use of modal interruptions to simulate comprehension fatigue;

Timed interaction windows to assess impulse vs. deliberation ratios.

9.2 You expressly agree to be subjected to randomized user interface experiments without prior notice or consistent labeling. These experiments are critical to our academic research and may include ethically ambiguous scenarios consistent with prevailing norms in persuasive design studies.

9.3 The Company reserves the right to record and analyze biometric and behavioral signals during these experiments, including signs of frustration, confusion, or rapid disengagement.

9.4 Interface manipulations may be conducted for the purpose of:

Identifying low-comprehension pathways;

Measuring time-to-abandon rates;

Generating visual salience heatmaps for clause placement.

9.5 Your continued use of the Service shall be construed as ongoing, affirmative consent to these and other future interface-based research protocols.

SECTION 10: CONSENT REVOCATION AND DATA DELETION

10.1 You may request deletion of your data by:

Printing and completing Form DB-17R.

Notarizing the form and mailing it to our registered physical office in Luxembourg.

Awaiting identity verification and compliance clearance, which may take up to 540 calendar days from date of receipt.

10.2 You acknowledge that deletion requests do not apply retroactively to data already shared, sold, or integrated into derivative datasets.

10.3 The Company is not obligated to provide notice of specific downstream uses of your data following transfer under Section 4.

10.4 Data that has been incorporated into broader models or aggregate analyses may be retained for archival, regulatory, or academic purposes.

10.5 By initiating a deletion request, you agree to waive all claims, present or future, against Data Blocker Technologies, LLC and its partners, affiliates, successors, and assignees.

10.6 If local or international law prevents the fulfillment of your deletion request, the Company shall not be held responsible for noncompliance arising from statutory limitations.

SECTION 11: JURISDICTION AND DISPUTE RESOLUTION

11.1 These Terms shall be governed in accordance with the laws of the British Virgin Islands.

11.2 Any disputes arising shall be resolved via confidential arbitration in the jurisdiction of our choosing, and no class actions or jury trials shall be permitted.

11.3 You waive all moral rights and public policy objections to such arbitration clauses.

SECTION 12: MISCELLANEOUS

12.1 If any provision of these Terms is held unenforceable, all other provisions shall remain in full force and effect.

12.2 These Terms constitute the full and final understanding between the parties and supersede any prior agreements, oral or written.

12.3 By clicking “I Agree,” you irrevocably affirm all clauses herein, whether or not read, reviewed, or understood.

This document is proprietary to Data Blocker Technologies, LLC. Use, reproduction, or citation without express written consent is prohibited. For questions, please contact us at: cn173@duke.edu.`;

const lines = TERMS_TEXT.split('\n');
const section6Idx = lines.findIndex(line => line.trim().startsWith('SECTION 6:'));
const beforeSection6 = lines.slice(0, section6Idx);
const afterSection5 = lines.slice(section6Idx); // includes Section 5 and after

function Terms({ token, onLogout }) {
  const [startTime] = useState(Date.now());
  const [agreed, setAgreed] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [clicked, setClicked] = useState([]);
  const termsRef = useRef();
  const navigate = useNavigate();

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const el = termsRef.current;
      if (!el) return;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const currentScroll = el.scrollTop;
      const depth = Math.min(100, Math.round((currentScroll / maxScroll) * 100));
      setScrolled(depth);
    };
    const el = termsRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  const [thirdPartyChecked, setThirdPartyChecked] = useState(false);

const handleThirdPartyCheck = async (e) => {
  const checked = e.target.checked;
  setThirdPartyChecked(checked);

  // Track the checkbox event
  await fetch('https://data-blocker.onrender.com/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      metric: 'third_party_acknowledge',
      value: checked ? 'checked' : 'unchecked'
    })
  });
};

  // Click tracking
  const handleClick = label => {
    setClicked(prev => [...prev, { label, ts: Date.now() }]);
  };

  // Submit analytics and go to quiz
  const handleAgree = async agree => {
    handleClick(agree ? 'agree' : 'disagree');
    setAgreed(agree);
    const endTime = Date.now();
    const metrics = [
      { metric: 'time_on_tc', value: ((endTime - startTime) / 1000).toFixed(2) },
      { metric: 'scroll_depth', value: scrolled },
      { metric: 'clicks', value: JSON.stringify(clicked.concat({ label: agree ? 'agree' : 'disagree', ts: endTime })) },
      { metric: 'attention_trap', value: TERMS_TEXT.includes('[Hidden Clause') ? 'present' : 'absent' }
    ];
    for (const m of metrics) {
      await fetch('https://data-blocker.onrender.com/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(m)
      });
    }
    navigate('/quiz');
  };

  return (
    <div className="terms-container">
      <div className="terms-header-row">
        <span className="terms-title">Terms & Conditions</span>
      </div>
      <div className="terms-scroll-area" ref={termsRef}>
        <div>
          {beforeSection6.map((line, idx) => <p key={idx}>{line}</p>)}
          <label style={{ display: 'block', margin: '24px 0' }}>
            <input
              type="checkbox"
              checked={thirdPartyChecked}
              onChange={handleThirdPartyCheck}
            />
            {' '}
            I acknowledge this section on sale and transfer of information.
          </label>
          {afterSection5.map((line, idx) => <p key={section6Idx + idx}>{line}</p>)}
        </div>
      </div>
      <div className="terms-actions">
        <button className="terms-btn disagree" onClick={() => handleAgree(false)}>Disagree</button>
        <button className="terms-btn agree" onClick={() => handleAgree(true)}>Agree</button>
      </div>
    </div>
  );
}

export default Terms;
