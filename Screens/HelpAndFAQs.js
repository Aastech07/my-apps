import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Appbar, List, Divider } from "react-native-paper";

const HelpAndFAQs = () => {
  return (
    <View style={styles.container}>
      {/* <Appbar.Header>
        <Appbar.Content title="Help & FAQs" />
      </Appbar.Header> */}
      <ScrollView>
        <List.Section>
          {/* Matrimony FAQs */}
          <List.Accordion
            title="Matrimony"
            left={(props) => <List.Icon {...props} icon="account-heart" />}
          >
            <List.Item
              title="How do I create a profile on the Matrimony platform?"
              description="To create a profile, navigate to the registration page and fill in the required details such as name, age, gender, etc. Follow the prompts to complete the registration process."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="How can I search for potential matches?"
              description="You can search for potential matches based on criteria such as age, location, education, profession, etc. Utilize the search filters provided on the platform to narrow down your search results."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="How do I communicate with other members?"
              description="Once you find a profile you're interested in, you can send them a message or express interest through the platform's messaging system. Respectful and courteous communication is encouraged."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
          </List.Accordion>
          <Divider />

          {/* Payment FAQs */}
          <List.Accordion
            title="Payment"
            left={(props) => <List.Icon {...props} icon="credit-card" />}
          >
            <List.Item
              title="What payment methods are accepted?"
              description="We accept various payment methods including credit/debit cards, bank transfers, and popular digital wallets such as PayPal, Google Pay, and Apple Pay."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="How secure are my payment details?"
              description="Your payment details are encrypted and securely processed using industry-standard security protocols. We do not store your payment information on our servers to ensure maximum security."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="What should I do if I encounter payment issues?"
              description="If you encounter any payment issues, such as failed transactions or unauthorized charges, please contact our customer support team for assistance. Be sure to provide relevant details such as transaction IDs and timestamps for faster resolution."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
          </List.Accordion>
          <Divider />

          {/* Electronics Buy/Sell FAQs */}
          <List.Accordion
            title="Electronics Buy/Sell"
            left={(props) => <List.Icon {...props} icon="cellphone" />}
          >
            <List.Item
              title="How do I sell electronics on the platform?"
              description="To sell electronics, navigate to the 'Sell Electronics' section and provide details such as product description, condition, price, etc. Upload clear photos of the item to attract potential buyers."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="Are there any restrictions on the types of electronics I can sell?"
              description="We have guidelines in place regarding the sale of certain electronics such as prohibited items or those that may infringe on intellectual property rights. Ensure that your listings comply with our policies."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="How can I ensure a smooth transaction when buying electronics?"
              description="When buying electronics, communicate with the seller to clarify any doubts or concerns you may have. Inspect the product thoroughly upon receipt and ensure that it matches the description provided in the listing."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
          </List.Accordion>
          <Divider />

          {/* Jobs & Recruiters FAQs */}
          <List.Accordion
            title="Jobs & Recruiters"
            left={(props) => <List.Icon {...props} icon="briefcase" />}
          >
            <List.Item
              title="How do I post a job opening?"
              description="Employers can post job openings by creating an account on the platform and providing details such as job title, description, requirements, etc. Follow the prompts to publish the job listing."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="How can I apply for jobs listed on the platform?"
              description="Job seekers can browse through available job listings and apply for positions that match their qualifications and interests. Follow the application instructions provided by the employer."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="What services do recruiters offer?"
              description="Recruiters on our platform offer services such as talent sourcing, candidate screening, interview coordination, etc. Employers can engage with recruiters to streamline their hiring process and find suitable candidates."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
          </List.Accordion>
          <Divider />

          {/* Images FAQs */}
          <List.Accordion
            title="Images"
            left={(props) => <List.Icon {...props} icon="image" />}
          >
            <List.Item
              title="How do I upload images to the platform?"
              description="To upload images, navigate to the image upload section and select the desired images from your device. You can upload multiple images at once to create albums or galleries."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="Are there any restrictions on the types of images I can upload?"
              description="We have guidelines in place regarding the types of images that can be uploaded to the platform. Avoid uploading images that contain explicit content, violence, or copyrighted material without proper authorization."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
            <Divider />
            <List.Item
              title="How can I manage my uploaded images?"
              description="You can manage your uploaded images by organizing them into albums or galleries, editing image titles and descriptions, and setting privacy settings to control who can view your images."
              descriptionNumberOfLines={5}
              titleNumberOfLines={2}
            />
          </List.Accordion>
          <Divider />
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HelpAndFAQs;
