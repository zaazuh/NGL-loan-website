function getBotResponse(input) {
    // Normalize input to lowercase
    input = input.toLowerCase();
 
    // Regular expressions for matching keywords
    const interestRateRegex = /interest rates|rate|rates/;
    const repaymentTermRegex = /repay|repayment|term/;
    const minIncomeRegex = /minimum income|min income|income requirement/;
    const medicalEmergencyRegex = /medical emergency|specific medical procedures|funds|receive/;
    const weddingLoanRegex = /wedding|destination|limitations?|apply/;
    const carLoanRegex = /car|vehicle|repairs?|maintenance/;
    const travelLoanRegex = /travel|international|destination|restrictions?|apply/;
    const loanProcessRegex = /change|schedule|apply|online|branch/;
    const rockPaperScissorsRegex = /rock|paper|scissors/;
    const greetingsRegex = /hello|hi/;
    const farewellRegex = /goodbye|bye/;
    const howAreYouRegex = /how are you/;
    const WhatLoansRegex = /loans|loan|types/;
    const HistoryRegex = /history/;
    const MissionRegex = /mission/;
    const VisionRegex = /vision/;
   
 
    // Match keywords and provide responses
    if (interestRateRegex.test(input)) {
        return "New Growth Loans Interest rate is: 18% – standard for all loans";
    } else if (repaymentTermRegex.test(input)) {
        return "Our Repayment terms are: 12-84 months (1-7 years) – changes depending on credit score for everyone";
    } else if (minIncomeRegex.test(input)) {
        return "The minimum monthly income is: R10,000";
    } else if (medicalEmergencyRegex.test(input)) {
        return "Medical emergencies happen, and they are unfortunately not something we can plan for. You can expect to receive your medical emergency fund within 24 hours.";
    } else if (weddingLoanRegex.test(input)) {
        return "Yes, you may use the wedding loan for destination weddings, but keep in mind the limit is R200,000. With a loan amount of R200,000 from New Growth Loans, you can portion out the funds for your wedding.";
    } else if (carLoanRegex.test(input)) {
        return "Your car breaks down unexpectedly, requiring major repairs including original car parts, which could cost up to R150,000. With a loan amount of R150,000 from New Growth Loans, you can allocate the funds for car repairs.";
    } else if (travelLoanRegex.test(input)) {
        return "You can use the travel loan for international travel. With a loan amount of R100,000 from New Growth Loans, you can portion out the funds for your dream vacation.";
    } else if (loanProcessRegex.test(input)) {
        return "You may either apply online or visit our branch. For more information, visit our contact us page.";
    } else if (rockPaperScissorsRegex.test(input)) {
        if (input === "rock") {
            return "paper";
        } else if (input === "paper") {
            return "scissors";
        } else if (input === "scissors") {
            return "rock";
        }
    } else if (greetingsRegex.test(input)) {
        return "Welcome to New Growth Loans Chatbot. How may i assist you today?";
    } else if (farewellRegex.test(input)) {
        return "Enjoy the rest of your day!";
    } else if (howAreYouRegex .test(input)) {
        return "I am good thank you for asking. How may i assist you today?";
    } else if (WhatLoansRegex.test(input)) {
        return "Whether your loan is for your dream wedding, your dream vacation, the new kitchen you have been dreaming about renovating, or perhaps you have a medical emergency, New Growth Loans offers you a new start. With flexible terms and rates tailored to your needs, New Growth Loans has you covered.";
    } else if (HistoryRegex.test(input)) {
        return "Whether your loan is for your dream wedding, your dream vacation, the new kitchen you have been dreaming about renovating, or perhaps you have a medical emergency, New Growth Loans offers you a new start. With flexible terms and rates tailored to your needs, New Growth Loans has you covered.";
    } else if (MissionRegex.test(input)) {
        return "At New Growth Loans, we're dedicated to unlocking financial opportunities for individuals through personalized loan solutions and exceptional service. Our mission is to offer a new start, empowering our clients to pursue their goals and embrace a brighter future.";
    } else if (VisionRegex.test(input)) {
        return "New Growth Loans envisions a future where financial barriers are overcome, and dreams are realized. We aspire to be the catalyst for positive change, giving individuals the opportunity to reclaim their futures and shape their destinies without limitations.";      
    } else {
        return "Try asking something else!";
    }
}
