Improved water consumption through smart sensors and the blockchain.

# Internet of Things

We use smart electrical water pressure sensors of Internet of Things open
hardware to measure water consumption in households. These sensors are easy to
install as they plug onto the water pipes and do not require cutting through
them or unplugging them. They cost less than 20 EUR per household.

# Blockchain micropayments

We provide a bitcoin-based solution which uses blockchain micropayment channels
to pay for water consumption in real time. This **fintech innovation** allows
for efficient low-fee trustless payments.

# Technology

The backend is a RESTful API developed in Python and Django. It uses a MySQL
database to store data. The mobile front-end for the consumer and the web
front-end for the municipality are developed using react.js and HTML5.

The communication with the bitcoin blockchain happens using Python and the
pybitcointools library for the blockchain history. The transaction is built and
signed using the bitcoinjs-lib library and node.js. We use the blockchain.info
API for broadcasting to the blockchain.

# Team

We are:

 * **Themis Papameletiou**, student of Electrical and Computer Engineering at
   the National Technical University of Athens, professional software engineer
   at reEmbed, and ex-Google intern.

 * **Vitalis Salis**, student of Electrical and Computer Engineering at the
   National Technical University of Athens, professional software engineer at
   GRNET.

 * **Dionysis Zindros**, blockchains PhD candidate at the University of Athens,
   Electrical and Computer Engineering graduate from the National Technical
   University of Athens, ex-Twitter intern, ex-Google, ex-deviantART.

# Crowdhackathon

This project was developed during the weekend at the [SmartCity
Crowdhackathon](http://crowdhackathon.com/smartcity/). 

# License

MIT.
