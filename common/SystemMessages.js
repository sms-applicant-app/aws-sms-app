'use strict'


exports.applicantAcceptedForInterview = (applicantName,
                                              storeName,
                                              hiringManagerName,

                                              jobTitle,
                                              calendarLink) => `${applicantName} Thanks for inquiring about a job at ${storeName}! We have reviewed your application for ${jobTitle}, let's face it we hire people not applications! We want to meet you! Click the link below to setup a face to face interview. Book Here ${calendarLink}`;
exports.applicantDeniedForInterview = (name, franchiseName) => `${name} Thanks for inquiring about a job at ${franchiseName}! We will review your application and contact you if we find you to be a good fit for us.`;

exports.applicantSelectedForHire = (name, franchiseName, linkToOnboardPapers, hiringManagerName, storePhone, startDate) => `${name}, Thanks for accepting a position with ${franchiseName}, Your manager is ${hiringManagerName}, if you have questions please call ${storePhone}. Your selected start date is ${startDate}. Please take the time to fill out these On Boarding forms before your start date that can be found here ${linkToOnboardPapers}. Welcome to the Team!`
exports.applicantSelectsInterviewTime = (name, hiringManager, interviewTime, interviewDate, address, hiringManagerCell) => `Hi ${name} Great Job completing the task, your interview with ${hiringManager} at ${interviewTime} on ${interviewDate}. Please arrive at ${address}. If you have any issues please call ${hiringManagerCell}`;
exports.afterInterviewDeclineMessage = (name) =>`Hi ${name} Thanks for stopping by and talking with us. We have interviewed several candidates and have made a choice. We hope you the best of luck in the future.`;

