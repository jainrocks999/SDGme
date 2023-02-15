import React from 'react';
import {Text, View} from 'react-native';
import HTML from 'react-native-render-html';
import table, {IGNORED_TAGS} from '@native-html/table-plugin';
import WebView from 'react-native-webview';
import ExternalLink from './external-link';
import {InfoText, InfoTitle} from '../../screens/settings/InformationScreen';

function Strong({children}) {
  return <Text>{children}</Text>;
}

export default function PrivacyPolicy({scrollViewRef}) {
  const html = `
    <table style="table-layout: fixed">
        <thead>
            <tr>
                <th><Strong>Purpose</Strong></th>
                <th><Strong>Personal Information Used</Strong></th>
                <th><Strong>Lawful Basis</Strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>To invite you to register to use and to use SDGme and the Applications</td>
                <td>Identity Data, Contact Data</td>
                <td>Performance of a contract with the business that you work for</td>
            </tr>
            <tr>
                <td>To manage our relationship with you including notifying you of changes to SDGme </td>
                <td>Identity Data, Contact Data, Marketing and Communications Data</td>
                <td>Your consent.Performance of a contract with you.Necessary for our legitimate.Interests (to keep records updated and to analyse how our customers/users use SDGme)</td>
            </tr>
            <tr>
                <td>To administer and protect our business and SDGme including troubleshooting, data analysis and system testing</td>
                <td>Identity Data, Contact Data, Usage Data</td>
                <td>Necessary for our legitimate Interests (for running our business, provision of administration and IT services, network security)</td>
            </tr>
            <tr>
                <td>To allow you to access Applications and provide you with news, and general information about other services	and applications which we may offer </td>
                <td>Identity Data, Contact Data, Usage Data, Marketing and Communications Data</td>
                <td>Consent Necessary for our legitimate Interests (to	develop our products/services and grow our business)</td>
            </tr>
            <tr>
                <td>To measure and analyse the effectiveness of the advertising we serve you</td>
                <td>Identity Data, Contact Data, Usage Data,Marketing and Communications Data</td>
                <td>Consent Necessary for our legitimate Interests (to develop our products/services and grow our business)</td>
            </tr>
            <tr>
                <td>To gather analysis or valuable information and monitor trends so we can improve SDGme and the Applications made available though it</td>
                <td>Identity Data, Contact Data, Usage Data, Marketing and Communications Data</td>
                <td>Consent Necessary for our legitimate Interests (to	develop our products/services and grow our business)</td>
            </tr>
            <tr>
                <td>Deal with your queries or complaints, claims, legal disputes or raise queries, claims, legal disputes or complaints with you or the business you work for</td>
                <td>All the personal information we collect</td>
                <td>Performance of a contract with the business that you work for. Necessary for our legitimate .Interests (to	develop our products/services and grow our business).To defend, bring or establish legal claims</td>
            </tr>
        </tbody>
    </table>
    `;
  const htmlProps = {
    WebView,
    renderers: {
      table,
    },
    ignoredTags: IGNORED_TAGS,
    renderersProps: {
      table: {},
    },
  };
  return (
    <View>
      <InfoTitle bold>Privacy Policy</InfoTitle>
      <View>
        <InfoText normal>
          Welcome to SDGme, which is owned and operated by SystemsLink 2000 Ltd.
          (we, our or us, as applicable). For further information about us and
          our contact details, please go to our
          <InfoText onPress={() => scrollViewRef?.current?.scrollToEnd()}>
            {' '}
            "CONTACT US"
          </InfoText>{' '}
          section below.
        </InfoText>
        <InfoText normal>
          We are committed to respecting your privacy. This Privacy Notice is
          intended to inform you about how we collect, use and protect any
          personal data we collect about you when you use the SDGme portal or
          the applications <Strong>(Applications)</Strong> made available
          through SDGme. It sets out how we comply with the data protection laws
          and what your rights are.
        </InfoText>
        <InfoText normal>
          For the purposes of data protection laws, we will be the controller of
          any of your personal data.
        </InfoText>
        <InfoText normal>
          We have appointed a data privacy manager who is responsible for the
          personal data collected and used by us; if you have any questions
          about this Privacy Notice, please use the details set out within the
          "CONTACT US" section below.
        </InfoText>
        <InfoText normal>This Privacy Notice provides details about:</InfoText>
        <View>
          <InfoText bold>what personal data we collect</InfoText>
          <InfoText normal>
            the purpose and legal basis for using personal data provided to us
          </InfoText>
          <InfoText normal>who we share your personal data with</InfoText>
          <InfoText normal>how long we will keep your personal data</InfoText>
          <InfoText normal>where we transfer your personal data to</InfoText>
          <InfoText normal>how we aim to protect your privacy</InfoText>
          <InfoText normal>
            your legal rights relating to your personal data
          </InfoText>
        </View>
      </View>
      <InfoTitle bold>WHAT PERSONAL DATA DO WE COLLECT?</InfoTitle>
      <View>
        <InfoText bold>
          We may collect the following information about you:
        </InfoText>
        <View>
          <InfoText normal>
            <Strong>Identity Data</Strong> including first name, last name,
            username or similar identifier, title.
          </InfoText>
          <InfoText normal>
            <Strong>Contact Data</Strong> including your business email address,
            business telephone number (including mobile number).
          </InfoText>
          <InfoText normal>
            <Strong>
              Usage Data – including how you use SDGme, such as your login time,
              changes to your account data, username and password. This is not
              collected by cookies, but by analysing your usage from the actions
              you take in connection with SDGme.
            </Strong>
          </InfoText>
          <InfoText normal>
            <Strong>Marketing and Communications Data</Strong> including your
            preferences in receiving marketing from us and the providers of the
            Applications and your communication preferences.
          </InfoText>
          <InfoText normal>
            We also collect, use and share Aggregated Data in connection with
            your usage, such as statistical or demographic data for any purpose.
            Aggregated Data could be derived from your personal data but is not
            considered personal data in law as this data will not directly or
            indirectly reveal your identity. For example, we may aggregate your
            Usage Data to calculate the percentage of users accessing a specific
            Application. However, if we combine or connect Aggregated Data with
            your personal data so that it can directly or indirectly identify
            you, we treat the combined data as personal data which will be used
            in accordance with this Privacy Notice.
          </InfoText>
          <InfoText normal>
            We do not collect any special categories of personal data about you
            (this includes details about your race or ethnicity, religious or
            philosophical beliefs, sex life, sexual orientation, political
            opinions, trade union membership, information about your health, and
            genetic and biometric data). Nor do we collect any information about
            criminal convictions and offences.
          </InfoText>
          <InfoText normal>
            We may use your personal data to contact you with newsletters,
            marketing or promotional materials and other information that may be
            of interest to you. You may opt out of receiving any, or all, of
            these communications from us by following the unsubscribe link or
            the instructions provided in any email we send.
          </InfoText>
        </View>
      </View>
      <InfoTitle bold>WHERE DO WE COLLECT YOUR PERSONAL DATA FROM?</InfoTitle>
      <View>
        <InfoTitle bold>YOU</InfoTitle>
        <View>
          <InfoText normal>
            We may collect your personal data directly or indirectly from you,
            for example when you:
          </InfoText>
          <InfoText normal>
            engage with us during the course of our relationship with you or the
            business you work for;
          </InfoText>
          <InfoText normal>
            use SDGme or any Application made available via it;
          </InfoText>
          <InfoText normal>
            communicate with us regarding SDGme or any of the Applications to
            ask a question, report a problem or for any other reason; and
          </InfoText>
          <InfoText normal>
            raise a query, complaint, claim, legal dispute on behalf of yourself
            or the business you work for.
          </InfoText>
        </View>
        <InfoTitle bold>THE BUSINESS YOU WORK FOR</InfoTitle>
        <View>
          <InfoText normal>
            We may collect your personal data from the business you work for,
            for example when they: give us your business email address, so that
            we can invite you to register to use SDGme;
          </InfoText>
        </View>
        <InfoTitle bold>OTHER THIRD PARTIES</InfoTitle>
        <View>
          <InfoText normal>
            We may also collect personal data from third parties who have your
            consent or some other lawful basis for doing so including:
          </InfoText>
          <View>
            <InfoText normal>owners and providers of the Applications</InfoText>
            <InfoText normal>Companies House;</InfoText>
            <InfoText normal>
              social media platforms including such as LinkedIn; Instagram,
              YouTube, Twitter or public Facebook page;
            </InfoText>
          </View>
        </View>
        <InfoTitle bold>HOW DO WE USE YOUR DATA?</InfoTitle>
        <HTML source={{html}} {...htmlProps} />
        <View>
          <InfoText normal>
            Where you have given us your consent to use your personal data in a
            particular manner, you have the right to withdraw this consent at
            any time, which you may do by contacting us as described in the
            "CONTACT US" section below. We will generally only process your
            personal data based on your consent in relation to direct marketing.
          </InfoText>
          <InfoText normal>
            Please note however that the withdrawal of your consent will not
            affect any use of the data made before you withdrew your consent and
            we may still be entitled to hold and process the relevant personal
            data to the extent that we are entitled to do so on a basis other
            than your consent. Withdrawing consent may also have the same
            effects as not providing the information in the first place, for
            example we may no longer be able to provide marketing information to
            you.
          </InfoText>
        </View>
      </View>
      <InfoTitle bold>DIRECT MARKETING</InfoTitle>
      <View>
        <InfoText normal>
          To ensure you are kept up to date, we use personal data for marketing
          purposes and may send you postal mail, texts and/or emails to update
          you on the latest offers and events. We may also show you online media
          communications through external social media platforms such as
          LinkedIn, Instagram, YouTube, Twitter and Facebook, and external
          digital advertisers such as Google.
        </InfoText>
        <InfoText normal>
          You have the right to opt out of receiving marketing communications
          from us at any time, by:
        </InfoText>
        <InfoText normal>
          informing us that you wish to change your marketing preferences by
          contacting our customer support team at{' '}
          <ExternalLink
            url="mailto:support@systems-link.zendesk.com"
            display="support@systems-link.zendesk.com"
          />
          .
        </InfoText>
        <InfoText normal>
          making use of the simple “unsubscribe” link in emails; and/or
        </InfoText>
        <InfoText normal>
          contacting our data privacy manager using the details set out within
          the "CONTACT US" section below.
        </InfoText>
        <InfoText normal>
          This will not stop service messages such as order updates and other
          non-marketing communications.
        </InfoText>
      </View>
      <InfoTitle bold>WHO DO WE SHARE YOUR PERSONAL DATA WITH?</InfoTitle>
      <View>
        <InfoText normal>
          We may share your personal data with the following third parties:
        </InfoText>
        <View>
          <InfoText normal>
            We may employ third party service providers and individuals to
            facilitate and support SDGme, provide SDGme on our behalf, perform
            Application related services or assist us in analysing how the
            portal and the Applications are used.
          </InfoText>
          <InfoText normal>
            Other companies within our group and affiliates.
          </InfoText>
          <InfoText normal>
            Purchasers, investors, funders and advisers if we sell or negotiate
            to sell all or part of our business or assets or restructure our
            business whether by merger, re-organisation or otherwise.
          </InfoText>
          <InfoText normal>
            Our advisors including legal or other advisors.
          </InfoText>
          <InfoText normal>
            Your advisors including legal or other advisors.
          </InfoText>
        </View>
        <InfoText normal>
          Under certain circumstances we may be required to disclose your
          personal data if required to do so by law or in response to valid
          requests by public authorities (e.g. a court/tribunal or a government
          agency), regulators, law enforcement agencies, security services,
          insurers.
        </InfoText>
        <InfoText normal>
          These third parties have access to your personal data only to perform
          these tasks on our behalf and are obligated not to disclose or use it
          for any other purpose.
        </InfoText>
        <InfoText normal>
          We do not share your personal data with the owner and providers of
          Applications. We only compare your login credentials with the login
          credentials required to access Applications, in order to authenticate
          your access to those Applications. Your personal data disclosed in
          connection with the Applications is treated in accordance with the
          privacy notices applicable to those respective Applications, so please
          make sure you read those privacy notices before you use these
          Applications.
        </InfoText>
      </View>
      <InfoTitle bold>HOW LONG DO WE KEEP YOUR PERSONAL DATA FOR?</InfoTitle>
      <View>
        <InfoText normal>
          We will not retain your personal data for longer than as is necessary
          for the purposes for which it has been obtained set out in this
          Privacy Notice and only then for as long as there is any risk of a
          potential claim, which will be dependent upon the limitation period
          for the particular type of claim.
        </InfoText>
        <InfoText normal>
          Various laws, accounting and regulatory requirements applicable to us
          also require us to retain certain records for specific amounts of
          time. In relation to your personal data, we will hold this only for so
          long as we require that personal information for legal or regulatory
          reasons or for legitimate organisational purposes. We will not keep
          your data for longer than is necessary for the purposes for which we
          collect them.
        </InfoText>
        <InfoText normal>
          We will also retain Usage Data for internal analysis purposes. Usage
          Data is generally retained for a shorter period of time, except when
          this data is used to strengthen the security or to improve the
          functionality of SDGme or the Applications made available via it, or
          we are legally obligated to retain this data for longer periods. We
          will anonymise your Usage Data (so that it can no longer be associated
          with you) for research or statistical purposes, in which case we may
          use this data indefinitely without further notice to you.
        </InfoText>
        <View>
          <InfoText normal>
            Our Data Retention Privacy Notice sets out the length of time we
            will usually retain personal data and where these default periods
            might be changed; you can request a copy of our Data Retention
            Privacy Notice by using the details set out in the "CONTACT US"
            section below. We have set out below the main retention periods
            which will apply:
          </InfoText>
          <InfoText normal>
            For users, we check accounts annually to see if they are being used.
            We reserve the right to delete your account and any personal data or
            other information associated with your use of SDGme if we identify
            during an annual review that there is no activity on your account by
            giving you 180 days prior written notice
          </InfoText>
          <InfoText normal>
            For marketing contacts it will generally be a period of 2 years
            after we were last in contact with you.
          </InfoText>
          <InfoText normal>
            For individuals seeking information, making complaints or otherwise
            corresponding with us it will generally be 2 years.
          </InfoText>
        </View>
      </View>
      <InfoTitle bold>WHERE DO WE TRANSFER YOUR PERSONAL DATA TO?</InfoTitle>
      <View>
        <InfoText normal>
          Your information, including personal data, may be transferred to, and
          maintained on computers located outside the United Kingdom and outside
          the EEA where the data protection laws may differ.
        </InfoText>
        <InfoText normal>
          We will take all the steps reasonably necessary to ensure that your
          data is treated securely and in accordance with this Privacy Notice
          and no transfer of your personal data will take place to an
          organisation or a country unless there are adequate controls in place
          including the security of your data and other personal information.
        </InfoText>
        <InfoText normal>
          Please contact us using the details set out in the "CONTACT US"
          section set out below if you want further information on the specific
          mechanism used by us when transferring your personal data out of the
          EEA.
        </InfoText>
      </View>
      <InfoTitle bold>HOW DO WE PROTECT YOUR PERSONAL DATA?</InfoTitle>
      <View>
        <InfoText normal>
          The security of your data is important to us but remember that no
          method of transmission over the Internet or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your personal data, we cannot guarantee its absolute
          security.
        </InfoText>
        <InfoText normal>
          Where we you have chosen a password that enables you to access SDGme,
          you are responsible for keeping this password confidential. We ask you
          not to share a password with anyone.
        </InfoText>
        <InfoText normal>
          Once we have received your information, we will use strict procedures
          and security features to try to prevent your personal data from being
          accidentally lost, used or accessed in an unauthorised way.
        </InfoText>
        <InfoText normal>
          Systems are hosted in a secure data centre facility with no physical
          access to the equipment or servers. Data stored within SDGme is
          encrypted in accordance with industry standards. Periodic
          Vulnerability and Penetration testing of SDGme is undertaken.
        </InfoText>
        <InfoText normal>
          We have put in place procedures to deal with any suspected personal
          data breach and will notify you and any applicable regulator when we
          are legally required to do so.
        </InfoText>
      </View>
      <InfoTitle bold>
        WHAT RIGHTS DO YOU HAVE UNDER THE GENERAL DATA PROTECTION REGULATION?
      </InfoTitle>
      <View>
        <InfoText normal>
          If you are a resident of the UK under the data protection laws you
          have certain rights relating to your personal data.
        </InfoText>
        <View>
          <InfoText normal>
            <Strong>The right to be informed</Strong> about how your personal
            data is being used.
          </InfoText>
          <InfoText normal>
            <Strong>The right to request access</Strong> to personal data we
            hold about you.
          </InfoText>
          <InfoText normal>
            <Strong>The right to request that we delete</Strong> your personal
            data in certain circumstances, for example when the data is no
            longer necessary for the purposes for which we collected it.
          </InfoText>
          <InfoText normal>
            <Strong>The right of rectification</Strong> where the personal data
            is out-of-date, inaccurate or incomplete.
          </InfoText>
          <InfoText normal>
            <Strong>
              The right to object to certain automated decision-making processes
            </Strong>{' '}
            using your personal data including profiling.
          </InfoText>
          <InfoText normal>
            <Strong>The right to restrict processing</Strong> your personal
            data.
          </InfoText>
          <InfoText normal>
            <Strong>The right to data portability;</Strong> the right to be
            provided with a copy of the information we have on you in a
            structured, machine-readable and commonly used format and
            transferred to another data controller.
          </InfoText>
          <InfoText normal>
            <Strong>
              The right to object to processing your personal data and/or to
              withdraw consent
            </Strong>{' '}
            at any time where we relied on your consent to process your personal
            information.
          </InfoText>
        </View>
        <InfoText normal>
          You should note that some of these rights, for example the right to
          require us to transfer your data to another service provider or the
          right to object to automated decision making, may not apply as they
          have specific requirements and exemptions which apply to them and they
          may not apply to personal information recorded and stored by us.
          However some have no conditions attached, so your right to withdraw
          consent or object to processing for direct marketing are absolute
          rights.
        </InfoText>
        <InfoText normal>
          Please note that we may request specific information in order to
          verify your identity before responding to such requests. This is
          another appropriate security measure to ensure that personal data is
          not disclosed to any personal who has no right to receive it.
        </InfoText>
        <InfoText normal>
          Whilst this Notice sets out a general summary of your legal rights in
          respect of personal data, this is a very complex area of law. More
          information about your legal rights can be found on the Information
          Commissioner’s website at{' '}
          <ExternalLink url="https://ico.org.uk/for-the-public/" />.
        </InfoText>
        <InfoText normal>
          If you wish to exercise any of the above rights please use the details
          provided below within the CONTACT US section.
        </InfoText>
        <InfoText normal>
          You as have the right to complain to the Information Commissioner’s
          Office at Wycliffe House, Water Lane, Wilmslow, SK9 5AF, United
          Kingdom if you believe we have not handled your personal data in
          accordance with the law. More information, including contact details,
          is available at <ExternalLink url="https://ico.org.uk" />.
        </InfoText>
      </View>
      <InfoTitle bold>APPLICATIONS AND LINKS TO OTHER SITES</InfoTitle>
      <View>
        <InfoText normal>
          SDGme contains some third party Applications and may contain links to
          other sites that are not operated by us. If you click on a third party
          Application or a third party link, you will be directed to that third
          party's Application or site respectively. We strongly advise you to
          review the privacy notice of every Application or site you visit.
        </InfoText>
        <InfoText normal>
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party Applications or
          sites.
        </InfoText>
      </View>
      <InfoTitle bold>CHANGES TO THIS PRIVACY NOTICE</InfoTitle>
      <View>
        <InfoText normal>
          We may update our Privacy Notice from time to time. We will notify you
          of any changes by posting the new Privacy Notice on this page.
        </InfoText>
        <InfoText normal>
          We will let you know via email and/or a prominent notice on SDGme,
          prior to the change becoming effective and update the date of posting
          at the bottom of this Privacy Notice.
        </InfoText>
        <InfoText normal>
          You are advised to review this Privacy Notice periodically for any
          changes. Changes to this Privacy Notice are effective when they are
          posted on this page.
        </InfoText>
      </View>
      <InfoTitle bold>CONTACT US</InfoTitle>
      <View>
        <InfoText normal>
          SDGme is a portal operated by SystemsLink 2000 Ltd. We are registered
          in England and Wales under company number 03168771 and have our
          registered office at 29 Progress Park Orders Lane, Kirkham, Preston,
          England, PR4 2TZ. Our main trading address is Bedford i-Lab, Priory
          Business Park, Stannard Way, Bedford MK44 3RZ. Our VAT number is
          GB670212273.
        </InfoText>
        <InfoText normal>
          To contact us, please email{' '}
          <ExternalLink
            url="mailto:sales@systems-link.com"
            display="sales@systems-link.com"
          />{' '}
          or telephone{' '}
          <ExternalLink
            url="tel:+44 (0)1234 834650"
            display="+44 (0)1234 834650"
          />
          .
        </InfoText>
      </View>

      <InfoText normal>Posted 09/12/2020</InfoText>
    </View>
  );
}
