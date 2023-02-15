import React from 'react';
import {View} from 'react-native';
import {InfoText, InfoTitle} from '../../screens/settings/InformationScreen';

export default function TermsAndConditions({scrollViewRef}) {
  return (
    <View>
      <InfoTitle bold>Terms and Conditions</InfoTitle>

      <InfoText bold>1. WELCOME</InfoText>
      <InfoText normal>
        1.1 Welcome to SDGme, which is operated by SystemsLink 2000 Ltd (
        <InfoText bold>we, our or us </InfoText> as applicable). For further
        information about us and our contact details, please go to our
        <InfoText onPress={() => scrollViewRef?.current?.scrollToEnd()}>
          {' '}
          CONTACT US{' '}
        </InfoText>
        section below.
      </InfoText>
      <InfoText normal>
        1.2 We want you to know and understand your rights as well as our rights
        relating to your use of the SDGme application, web portal and the
        services made available through them (<InfoText bold>SDGme</InfoText>).
      </InfoText>
      <InfoText normal>
        1.3 When we refer to ‘you’ in these Terms of Use we mean:
      </InfoText>
      <InfoText normal>
        - you as an individual, where you are using SDGme in your personal
        capacity; and/or
      </InfoText>
      <InfoText normal>
        - the organisation that you represent (if applicable), where you are
        acquiring SDGme for use by individuals within your organisation (
        <InfoText bold>Organisation</InfoText>).
      </InfoText>
      <InfoText normal>
        1.4 These Terms of Use also refer to our Privacy Notice. They all form
        part of our agreement with you, so please take the time to read them
        before you access and make use of SDGme. If you do not agree to these
        Terms of Use do not access SDGme. If you have any queries or concerns
        regarding these Terms of Use, please contact us at
        sales@systems-link.com.
      </InfoText>
      <InfoText bold>{'\n'}2. YOUR PRIVACY AND OUR USE OF COOKIES</InfoText>
      <InfoText normal>
        2.1 We take your privacy very seriously. Please read our Privacy Notice
        to see how we use your personal information. Please note, that if you
        have been given access to SDGme by your Organisation any data that you
        generate when using SDGme, including information you input about your
        actions or behaviours, may be visible to, or shared with, that
        Organisation. In addition, we may anonymise and aggregate any of the
        personal information we hold about you, and such aggregated, anonymised
        data may be shared with other users of SDGme from your Organisation.
        Where the functionality of SDGme allows, you may export your data or
        share it with other individuals e.g. via your social media accounts. Any
        data you choose to share via your social media accounts will be visible
        to other users of such third party applications/sites.
      </InfoText>
      <InfoText bold>{'\n'}3. ACCOUNT REGISTRATION</InfoText>
      <InfoText normal>
        3.1 To use SDGme you must register for an account including creating a
        password to access your account.
      </InfoText>
      <InfoText normal>
        3.2 When setting up your account you must make sure that all the
        information you provide about yourself is true, accurate, current and
        complete (<InfoText bold>User Data</InfoText>). You must promptly update
        any User Data that changes, for example if you change any of your
        registration details such as your email address.
      </InfoText>
      <InfoText normal>
        3.3 Each registration is for a single user only. You are not allowed to
        share your login credentials or give access to the content available via
        SDGme through your login credentials to anyone else. To be clear, we do
        not permit multiple users on a network or within an organisation to use
        the same login credentials. 44373082.1 2
      </InfoText>
      <InfoText normal>
        3.4 To help us maintain the security of SDGme, you must keep your
        registration details, including any access codes given to you,
        confidential. If you become aware of any misuse or unauthorised use of
        your registration details, then you must inform us immediately by
        sending us an email at support@systems-link.zendesk.com.
      </InfoText>
      <InfoText normal>
        3.5 If you have breached, or we have reason to believe that you have
        breached, or will breach, these Terms of Use, we may terminate or
        suspend your registration and/or access to SDGme.
      </InfoText>
      <InfoText normal>
        3.6 You can close your account at any time. Please email us at
        support@systems- link.zendesk.com to request closure.
      </InfoText>
      <InfoText normal>
        3.7 We check accounts annually to see if they are being used. We reserve
        the right to delete your account and any personal data or other
        information associated with your use of SDGme if we identify during an
        annual review that there is no activity on your account by giving you
        180 days prior written notice.
      </InfoText>
      <InfoText bold>
        {'\n'}4. HOW YOU MAY USE CONTENT AVAILABLE ON OR VIA SDGme
      </InfoText>
      <InfoText normal>
        4.1 We are the owner or the licensee of all intellectual property rights
        in SDGme, and in the content published on it or made available via it.
        They are protected by copyright laws and treaties around the world. All
        such rights are reserved.
      </InfoText>
      <InfoText normal>
        4.2 You may print copies and download individual extracts from any
        page(s) within SDGme for your personal use.
      </InfoText>
      <InfoText normal>
        4.3 You may not otherwise reproduce, modify, copy or distribute or use
        any of the content made available via SDGme (whether for commercial or
        non-commercial purposes), other than as expressly permitted under
        paragraph 4.1 above. To be clear, you are not in any circumstances
        permitted to:
      </InfoText>
      <InfoText normal>
        4.3.1 make any other commercial use of any such content;
      </InfoText>
      <InfoText normal>
        4.3.2 modify, adapt or create any derivative works of any such content;
        or
      </InfoText>
      <InfoText normal>
        4.3.3 sell, distribute, loan, share give, lend or disclose the content
        or any extract of it, to any other person outside of your business;
      </InfoText>
      <InfoText normal>
        4.3.4 make any such content available on any corporate intranet,
        extranet or other web- based product or service operated by or for you
        without our prior written consent. To ask for consent please email us at
        support@systems-link.zendesk.com;
      </InfoText>
      <InfoText normal>
        4.3.5 remove, obscure or otherwise tamper with any copyright and
        proprietary notices that relate to, or are contained within, the
        content;
      </InfoText>
      <InfoText normal>
        4.3.6 otherwise make any use of the content or an extract from it, in
        any form, by any manner or for any purpose, except as expressly set out
        in paragraph 4.1 ).
      </InfoText>
      <InfoText normal>
        4.4 Nothing in these Terms of Use permits you to re-create the whole or
        substantial part of SDGme by making repeated and systematic copies of
        insubstantial parts of SDGme.
      </InfoText>
      <InfoText normal>
        4.5 Please be aware that if you use any of the content or extracts from
        it in a way other than is specifically permitted under these Terms of
        Use:
      </InfoText>
      <InfoText normal>
        4.5.1 you may be infringing copyright or other rights and therefore may
        be exposed to civil and/or criminal legal action; 44373082.1 3
      </InfoText>
      <InfoText normal>
        4.5.2 your right to use SDGme will immediately cease and you must, at
        our option or return, destroy any copies of any content that you have
        made.
      </InfoText>
      <InfoText normal>
        4.6 The trademarks appearing on SDGme are owned by us or our licensors
        including, without limitation, ‘Inspired Energy’. No permission is given
        in respect of the use of any of these marks or brands, and any such use
        may constitute an infringement of the holder’s rights.
      </InfoText>
      <InfoText bold>{'\n'}5. DATA</InfoText>
      <InfoText normal>
        5.1 If you input data into SDGme, you will own any intellectual property
        rights (to the extent any exist) in that data. You give us a
        non-exclusive, worldwide royalty free licence to use that data for the
        purposes of:
      </InfoText>
      <InfoText normal>5.1.1 displaying that data to you;</InfoText>
      <InfoText normal>
        5.1.2 if applicable, disclosing that data to your Organisation and to
        other users in your Organisation on an aggregated, anonymised basis; and
      </InfoText>
      <InfoText normal>
        5.1.3 enabling you to use the relevant features of functionality of
        SDGme.
      </InfoText>
      <InfoText normal>
        5.2 You also give us a non-exclusive, worldwide, royalty free licence to
        collate and use anonymised, aggregated data generated from your usage
        and the functioning and performance of SDGme in order to:
      </InfoText>
      <InfoText normal>5.2.1 improve SDGme;</InfoText>
      <InfoText normal>5.2.2 develop other services and products; and</InfoText>
      <InfoText normal>
        5.2.3 to publish the same either alone or together with usage data
        generated from other users of SDGme to: (i) your Organisation (if
        applicable); and (ii) to third parties. To avoid doubt, this use will
        not include any personal data, nor any details that identify you.
      </InfoText>
      <InfoText normal>
        5.3 SystemsLink 2000 Ltd is part of the Inspired Energy plc group of
        companies. As such:
      </InfoText>
      <InfoText normal>
        5.3.1 you permit us to share such information that may reasonably be
        required for reporting as may be necessary to comply with reporting
        obligations required of a plc.
      </InfoText>
      <InfoText normal>
        5.3.2 you permit us and the Inspired Energy plc group of companies to
        occasionally e- mail marketing and other information pertaining to SDGme
        and the Sustainable Development Goals only. You may ‘unsubscribe’ from
        the receipt of such material by emailing sales@systems-link.com or using
        the ‘unsubscribe’ link appended to all such messages.
      </InfoText>
      <InfoText bold>{'\n'}6. DO NOT RELY ON INFORMATION</InfoText>
      <InfoText normal>
        6.1 SDGme and content on SDGme is provided for general information only.
        Although we make reasonable efforts to update the information on SDGme,
        we make no representations, warranties or guarantees, whether express or
        implied, that the content on the application is accurate, complete or up
        to date.
      </InfoText>
      <InfoText bold>{'\n'}7. GENERAL PROHIBITIONS ON USE OF SDGme</InfoText>
      <InfoText normal>7.1 You must</InfoText>
      <InfoText normal>
        not misuse SDGme by knowingly introducing viruses, trojans, worms, logic
        bombs or other material that is malicious or technologically harmful.
        You must not attempt to gain unauthorised access to SDGme, the server on
        which SDGme is stored or any server, computer or database connected to
        SDGme. You must not attack SDGme via a denial-of- service attack or a
        distributed denial-of service attack. By breaching this provision, you
        would commit a criminal offence under the Computer Misuse Act 1990. We
        will report any such breach to the relevant law enforcement authorities,
        and we will co-operate with those authorities by disclosing your
        identity to them. In the event of such a breach, your right to use
        SDGme, will cease immediately. You also agree not to reproduce,
        duplicate, copy or re-sell any part of SDGme in contravention of the
        provisions of our Terms of Use. 44373082.1 4
      </InfoText>
      <InfoText bold>
        {'\n'}8. OUR LIABILITY TO YOU AS AN INDIVIUAL USER OF SDGme
      </InfoText>
      <InfoText normal>
        8.1 We do not exclude or limit in any way our liability to you where it
        would be unlawful to do so. This includes liability for death or
        personal injury caused by our negligence or the negligence of our
        employees, agents or subcontractors and for fraud or fraudulent
        misrepresentation.
      </InfoText>
      <InfoText normal>
        8.2 Please note that we only provide SDGme to you for domestic and
        private use. You agree not to use SDGme for any commercial or business
        purposes, and we have no liability to you for any loss of profit, loss
        of business, business interruption, or loss of business opportunity.
      </InfoText>
      <InfoText normal>
        8.3 If defective digital content that we have supplied, damages a device
        or digital content belonging to you and this is caused by our failure to
        use reasonable care and skill, we will either repair the damage or pay
        you compensation. However, we will not be liable for damage that you
        could have avoided by following our advice to apply an update offered to
        you free of charge or for damage that was caused by you failing to
        correctly follow installation instructions or to have in place the
        minimum system requirements advised by us.
      </InfoText>
      <InfoText bold>{'\n'}9. OUR LIABLITY TO ORGANISATIONS</InfoText>
      <InfoText normal>
        9.1 The provisions of this paragraph 9 apply to organisations only and
        ‘you’ in this paragraph 9 means the relevant Organisation.
      </InfoText>
      <InfoText normal>
        9.2 If you are an Organisation providing individuals, including but not
        limited to your employees or staff, with access to SDGme (each an{' '}
        <InfoText bold>Individual</InfoText>):
      </InfoText>
      <InfoText normal>
        9.2.1 you are liable for any breach of these Terms of Use by any
        Individual; and
      </InfoText>
      <InfoText normal>
        9.2.2 you warrant that the Organisation will only provide (or ensure the
        provision of) personal data about an Individual to us where that
        personal data has been lawfully obtained and where the Organisation is
        lawfully entitled to provide (or ensure the provision of) that personal
        data to us for the purposes of the provision of SDGme to the
        Organisation and/or the Individual.
      </InfoText>
      <InfoText normal>
        9.3 We do not exclude or limit in any way our liability to you where it
        would be unlawful to do so. This includes liability for death or
        personal injury caused by our negligence or the negligence of our
        employees, agents or subcontractors and for fraud or fraudulent
        misrepresentation.
      </InfoText>
      <InfoText normal>
        9.4 We exclude all implied conditions, warranties, representations or
        other terms that may apply to SDGme or any content made available via
        SDGme.
      </InfoText>
      <InfoText normal>
        9.5 Subject to paragraph 9.4 , we will not be liable to you for any loss
        or damage, whether in contract, tort (including negligence), breach of
        statutory duty, or otherwise, even if foreseeable, arising under or in
        connection with:
      </InfoText>
      <InfoText normal>
        9.5.1 use of, or inability to use SDGme by you or any Individual; or
      </InfoText>
      <InfoText normal>
        9.5.2 use of or reliance on any content displayed in SDGme; In
        particular, we will not be liable for:
      </InfoText>
      <InfoText normal>
        9.5.3 loss of profits, sales, business, or revenue;
      </InfoText>
      <InfoText normal>9.5.4 business interruption;</InfoText>
      <InfoText normal>
        9.5.5 loss of anticipated savings; 44373082.1 5
      </InfoText>
      <InfoText normal>
        9.5.6 loss or corruption of data, information or software;
      </InfoText>
      <InfoText normal>
        9.5.7 loss of business opportunity, goodwill or reputation; or
      </InfoText>
      <InfoText normal>
        9.5.8 any indirect or consequential loss or damage.
      </InfoText>
      <InfoText normal>
        9.6 Subject to paragraphs 9.4 and 9.5 , if we are found to be liable,
        our total liability to you in respect of all claims made against us in
        connection with these Terms of Use and SDGme is limited to:
      </InfoText>
      <InfoText normal>
        9.6.1 £100 where your access to SDGme has been provided by us at no
        charge; or
      </InfoText>
      <InfoText normal>
        9.6.2 an amount equivalent to the total fees actually paid by you for
        access to SDGme in the 12 months prior to the claim arising.
      </InfoText>
      <InfoText normal>
        9.7 You agree only to use SDGme in accordance with these Terms of Use.
        You agree that you will compensate us (and our employees, officers,
        agents and suppliers) in full for any damages, losses, costs and
        expenses, including reasonable legal fees we incur that arise out of any
        breach by you of these Terms of Use (including any actions you take
        which disrupt access to and/or the functioning of SDGme) or any
        liability we incur as a result of the use of SDGme by you and any other
        person that uses your account.
      </InfoText>
      <InfoText bold>{'\n'}10. WE MAY SUSPEND OR WITHDRAW SDGme</InfoText>
      <InfoText normal>
        10.1 We try to make SDGme available at all times, but, of course, due to
        the inherent nature of online and internet based services, we cannot
        guarantee this.
      </InfoText>
      <InfoText normal>
        10.2 We provide access to SDGme as a value add to our services.
        Currently, no separate charge is made to access it. We may decide in the
        future to charge for access. If we do, we will give you prior notice of
        any such decision.
      </InfoText>
      <InfoText normal>
        10.3 We do not guarantee that SDGme will always be available or be
        uninterrupted. We may suspend or withdraw or restrict the availability
        of all or any part of SDGme for business and operational reasons. We
        will try to give you reasonable notice of any suspension or withdrawal.
      </InfoText>
      <InfoText bold>{'\n'}11. NO RESONSIBILITY FOR VIRUSES</InfoText>
      <InfoText normal>
        11.1 We do not guarantee that SDGme will be secure or free from bugs or
        viruses.
      </InfoText>
      <InfoText normal>
        11.2 You are responsible for configuring your information technology,
        computer programmes and platform to access SDGme. You should use your
        own virus protection software.
      </InfoText>
      <InfoText bold>{'\n'}12. LINKS</InfoText>
      <InfoText normal>
        12.1 Where SDGme contains links to other sites and resources provided by
        third parties, these links are provided for your information only. Such
        links should not be interpreted as approval by us of those linked
        websites or information you may obtain from them.
      </InfoText>
      <InfoText normal>
        12.2 We have no control over the contents of those sites or resources.
      </InfoText>
      <InfoText bold>{'\n'}13. CHANGES</InfoText>
      <InfoText normal>
        13.1 We may amend these Terms of Use from time to time. Every time you
        wish to use SDGme, please check the Terms of Use to ensure you
        understand the terms that apply at that time. 44373082.1 6
      </InfoText>
      <InfoText normal>
        13.2 We may update and change SDGme from time to time. We will try to
        give you reasonable notice of any major changes.
      </InfoText>
      <InfoText bold>
        {'\n'}14. GENERAL COMPLIANTS, FEEDBACK AND REQUESTS
      </InfoText>
      <InfoText normal>
        14.1 If you have any general complaints or wish to request further
        information about SDGme, please contact us via email at
        sales@systems-link.com and we will do our best to resolve these.
      </InfoText>
      <InfoText normal>
        14.2 Your feedback and suggestions about SDGme are always gratefully
        received by us however you understand that we may use these without any
        obligation to compensate you for them and you are, of course, under no
        obligation to us to provide them.
      </InfoText>
      <InfoText bold>{'\n'}15. GENERAL</InfoText>
      <InfoText normal>
        15.1 Severability. If any part of these Terms of Use is found to be
        unenforceable as a matter of law, all other parts of these Terms of Use
        will not be affected and will remain in force.
      </InfoText>
      <InfoText normal>
        15.2 Events or circumstances beyond our reasonable control. If we are
        prevented or delayed from complying with our obligations under these
        Terms by anything you (or anyone acting on your behalf) does or fails to
        do or due to events or circumstances beyond our reasonable control. In
        such circumstances including fire, flood and other acts of God, strikes,
        trade disputes, lock outs, restrictions of imports or exports, riot,
        accident, disruption to energy supplies, civil commotion, acts of
        terrorism or war, our inability or delay in performing our obligations
        will not be deemed to be in breach of contract.
      </InfoText>
      <InfoText normal>
        15.3 Assignment. You may not assign, sub-license or otherwise transfer
        any of your rights under these Terms of Use.
      </InfoText>
      <InfoText normal>
        15.4 Waiver. If you breach these Terms of Use and we choose to ignore
        your breach, we will still be entitled to use our rights and remedies at
        a later date or in any other situation where you breach the Terms of Use
        again.
      </InfoText>
      <InfoText normal>
        15.5 Exclusion of third party rights. The contract (as set out in these
        Terms) is between you and us. No other person shall have any rights to
        enforce any of its terms.
      </InfoText>
      <InfoText normal>
        15.6 Governing law and jurisdiction. These Terms, their subject matter
        and their formation, are governed by English law. You and we both agree
        that the courts of England and Wales will have exclusive jurisdiction
        except that if you are a resident of Northern Ireland you may also bring
        proceedings in Northern Ireland, and if you are resident of Scotland,
        you may also bring proceedings in Scotland.
      </InfoText>
      <InfoText bold>{'\n'}16. CONTACT US</InfoText>
      <InfoText normal>
        16.1 SDGme is an application operated by SystemsLink 2000 Ltd. We are
        registered in England and Wales under company number 03168771 and have
        our registered office at 29 Progress Park Orders Lane, Kirkham, Preston,
        England, PR4 2TZ. Our main trading address is Bedford i-Lab, Priory
        Business Park, Stannard Way, Bedford MK44 3RZ. Our VAT number is
        GB670212273.
      </InfoText>
      <InfoText normal>
        {'\n'}To contact us, please email sales@systems-link.com or telephone
        +44 (0)1234 834650.
      </InfoText>
      <InfoText normal>{'\n'}Posted 25th June 2021</InfoText>
    </View>
  );
}
