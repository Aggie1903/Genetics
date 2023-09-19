import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Pdf from 'react-native-pdf'; //sketch

export default class pdfedit extends React.Component {
  state = {
    currentPage: 1,
    totalPages: 0,
    uri: null,
  };

  handlePress = uri => {
    this.setState({uri});
  };

  handleBack = () => {
    this.setState({uri: null});
  };

  render() {
    const source = this.state.uri ? {uri: this.state.uri, cache: false} : null;

    return (
      <View style={styles.container}>
        {!this.state.uri ? (
          <View style={styles.linksContainer}>
            <Image
              style={styles.image}
              source={require('./pictures/Genetics.png')}
            />
            {/* // PDF1 */}
            <TouchableOpacity
              onPress={() =>
                this.handlePress(
                  'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
                )
              }>
              <Text style={styles.linkText}>PDF 1</Text>
            </TouchableOpacity>
            {/* // PDF2 */}
            <TouchableOpacity
              onPress={() =>
                this.handlePress(
                  'https://example-files.online-convert.com/document/pdf/example.pdf',
                )
              }>
              <Text style={styles.linkText}>PDF 2</Text>
            </TouchableOpacity>
            {/* // PDF3 */}
            <TouchableOpacity
              onPress={() =>
                this.handlePress(
                  'https://www.africau.edu/images/default/sample.pdf',
                )
              }>
              <Text style={styles.linkText}>PDF 3</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.handleBack}>
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
            <View style={styles.pdfContainer}>
              <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                  this.setState({totalPages: numberOfPages});
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                  this.setState({currentPage: page});
                }}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
              />
              <View style={styles.pageNumberContainer}>
                <Text style={styles.pageNumberText}>
                  Page {this.state.currentPage} of {this.state.totalPages}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  linksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 18,
    marginBottom: 20,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  pdfContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure the button is always on top
  },
  backButtonText: {
    color: 'white',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pageNumberContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 350,
    height: 130,
    marginBottom: 200,
    position: 'absolute', // Deze regel zet de afbeelding vast op de positie
    top: 20, // Deze regel zorgt ervoor dat de afbeelding altijd bovenaan staat
    left: -150, // Deze regel zorgt ervoor dat de afbeelding altijd links is uitgelijnd
    zIndex: 1, // Deze regel zorgt ervoor dat de afbeelding boven andere elementen wordt weergegeven
  },

  pageNumberText: {
    color: 'white',
  },
});
