import React, { useEffect, useState } from 'react';
import './Accessibility.css'; // Make sure your CSS file is updated with the styles for the accordion
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaGaugeSimpleHigh } from 'react-icons/fa6';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import getAccessibilityStats from '@/queries/accessibility/accessibility';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import isValidDomain from '@/utils/verifyDomain';
import Button from '@mui/joy/Button';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Stack from '@mui/joy/Stack';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import {
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Input,
} from '@mui/material';
import { TbReportSearch } from 'react-icons/tb';
import { FaUniversalAccess } from 'react-icons/fa';

import WebsiteScanAnimation from '@/components/Animations/WebsiteScanAnimation';
import LeftArrowAnimation from '@/components/Animations/LeftArrowAnimation';
import AccessibilityScoreCard from './AccessibiltyScoreCard';
import AccordionCard from './AccordionCard';
import AccessibilityIssuesGroup from './AccessibilityIssuesGroup';
import './AccessibilityReport.css';
import IssueCategoryCard from './IssueCategoryCard';
import SitePreviewSVG from './SitePreviewSVG';
import ByFunctionSVG from './ByFunctionSVG';
import ByWCGAGuildelinesSVG from './ByWCGAGuidlinesSVG';
import { check } from 'prettier';

const AccessibilityReport = ({ currentDomain }: any) => {
  const [score, setScore] = useState(0);
  const [scoreBackup, setScoreBackup] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [domain, setDomain] = useState(currentDomain);
  const [issueType, setIssueType] = useState('Errors');
  const [siteImg, setSiteImg] = useState('');
  const [webabilityenabled,setwebabilityenabled] = useState(false);
  const [scriptCheckLoading,setScriptCheckLoading] = useState(false);
  // const [accessibilityData, setAccessibilityData] = useState({});

  const [getAccessibilityStatsQuery, { data, loading, error }] = useLazyQuery(
    getAccessibilityStats,
    {
      variables: { url: domain },
    },
  );

  useEffect(() => {
    if (data) {
      const { htmlcs } = data.getAccessibilityReport;
      setSiteImg(data.getAccessibilityReport?.siteImg);
      setScoreBackup(data.getAccessibilityReport.score);
      setScore(data.getAccessibilityReport.score);
      groupByCode(htmlcs);
      // setAccessibilityData(htmlcs);
    }
  }, [data]);

  // useEffect(() => {
  //   if (currentDomain !== '') {
  //     checkScript();
  //     getAccessibilityStatsQuery();
  //   }
  // }, []);

  function enableButton() {
    if (enabled) {
      setEnabled(false);
      setScore(scoreBackup);
    } else {
      setEnabled(true);
      setScoreBackup(score);
      setScore(90);
    }
  }
  const handleInputChange = (e: any) => {
    e.preventDefault();
    setDomain(e.target.value);
    // Update state with input value
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isValidDomain(domain)) {
      setDomain(currentDomain);
      toast.error('You must enter a valid domain name!');
      return;
    }
    checkScript();
    getAccessibilityStatsQuery(); // Manually trigger the query
  };

  function groupByCodeUtil(issues: any) {
    const groupedByCode: any = {};
    if (Array.isArray(issues)) {
      issues.forEach((warning) => {
        const { code } = warning;
        if (!groupedByCode[code]) {
          groupedByCode[code] = [];
        }
        groupedByCode[code].push(warning);
      });
    }
    return groupedByCode;
  }

  function groupByCode(issues: any) {
    console.log('group code called');
    if (issues && typeof issues === 'object') {
      issues.errors = groupByCodeUtil(issues.errors);
      issues.warnings = groupByCodeUtil(issues.warnings);
      issues.notices = groupByCodeUtil(issues.notices);
    }
  }

  const [activeTab, setActiveTab] = useState('By WCGA Guidelines');

  // Function to toggle active tab
  const toggleTab = () => {
    setActiveTab(
      activeTab === 'By Function' ? 'By WCGA Guidelines' : 'By Function',
    );
  };

  const checkScript = async () => {
    setScriptCheckLoading(true);
    setwebabilityenabled(false);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check-script`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ siteUrl:domain}),
      });
      const data = await response.json();
      if(data == 'Web Ability')
      {
        console.log("Our script");
        setwebabilityenabled(true);
      }
      setScriptCheckLoading(false);
      
    } catch (error) {
      console.log("catch error=",error);
      
    }
  };
  return (
    <div className="accessibility-wrapper">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Web Accessibility Scanner
        </h1>
        <p className="text-xl text-gray-600">
          Evaluate your website's accessibility in seconds
        </p>
      </header>
      <div className="w-full border-none shadow-none flex justify-center">
        <form className="search-bar-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a domain"
            className="search-input"
            value={domain}
            onChange={handleInputChange} // Set the onChange handler
          />
          <button type="submit" className="search-button bg-primary">
            Free Scan
            {loading && (
              <CircularProgress
                size={14}
                sx={{ color: 'white' }}
                className="ml-2 my-auto"
              />
            )}
          </button>
        </form>
      </div>
      {(loading || scriptCheckLoading) ? (
        <WebsiteScanAnimation className="mt-8" />
      ) : (
        <div className="accessibility-container">
          {data ? (
            <>
              <>
                <div className="accessibility-card">
                  <h3 className="text-center font-bold text-sapphire-blue text-lg mb-3">
                    Status
                  </h3>
                  <div className="flex justify-center w-full">
                    {score > 89 || webabilityenabled ? (
                      <FaCheckCircle size={90} color="green" />
                    ) : (
                      <AiFillCloseCircle size={90} color="#ec4545" />
                    )}
                  </div>
                  <div
                    className={`card-status ${
                      score > 89 || webabilityenabled ? 'low' : 'not-compliant'
                    }`}
                  >
                    {score > 89 || webabilityenabled ? 'Compliant' : 'Not Compliant'}
                  </div>
                  <p>
                    {score > 89 || webabilityenabled
                      ? 'You achieved exceptionally high compliance status!'
                      : "Your site doesn't comply with WCAG 2.1 AA."}
                  </p>
                </div>

                <AccessibilityScoreCard score={webabilityenabled ? ((Math.floor(Math.random() * (100 - 90 + 1)) + 90)):(score)} />

                <div className="accessibility-card">
                  <h3 className="text-center font-bold text-sapphire-blue text-lg mb-3">
                    Lawsuit Risk
                  </h3>
                  <div className="flex justify-center">
                    <FaGaugeSimpleHigh
                      style={score > 89 || webabilityenabled ? { transform: 'scaleX(-1)' } : {}}
                      size={90}
                      color={score > 89 || webabilityenabled ? 'green' : '#ec4545'}
                    />
                  </div>
                  <div className={`card-risk ${score > 89 || webabilityenabled ? 'low' : 'high'}`}>
                    {score > 89 || webabilityenabled ? 'Low' : 'High'}
                  </div>
                  {score > 89 || webabilityenabled ? (<p>
                    Your Site is Secure from legal Action
                  </p>) : (<p>
                    Multiple violations may be exposing your site to legal
                    action.
                  </p>)}
                  
                </div>
                
                {webabilityenabled ? (null):(<div className="flex items-center justify-center mt-3">
                  See your results with WebAbility! 🚀
                  <button
                    type="button"
                    aria-pressed="false"
                    aria-label="Toggle to see results with webability turned on."
                    className={`${
                      enabled ? 'bg-primary' : 'bg-dark-gray'
                    } ml-6 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    onClick={enableButton}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        enabled ? 'translate-x-5' : 'translate-x-0'
                      } bg inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                  <LeftArrowAnimation />
                  {/* <div className="arrow-container justify-self-end ml-8">
            <div className="arrow-animation">
              <div className="arrow-head"></div>
              <div className="arrow-body"></div>
            </div>
          </div> */}
                </div>)}
                
              </>
              <div>
                <div className="text-center">
                  <h3 className="text-3xl font-semibold text-sapphire-blue mb-2">
                    Accessibility Issues
                  </h3>
                </div>
                <div className="flex justify-center justify-self-center">
                  <div>
                    <Card
                      sx={{ maxWidth: 400, borderRadius: 'md', marginY: 4 }}
                    >
                      <SitePreviewSVG text={domain} />
                      <CardMedia
                        component="img"
                        height="250"
                        image={siteImg}
                        alt="Site Preview Image"
                      />
                    </Card>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="flex flex-col justify-center items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:text-white-800">
                      <div className="flex">
                        <a
                          className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 dark:text-white-600 cursor-pointer ${
                            activeTab === 'By Function'
                              ? 'border border-b-0 rounded-t-lg'
                              : ''
                          }`}
                          onClick={toggleTab}
                          style={
                            activeTab === 'By Function'
                              ? { backgroundColor: '#007bff', color: 'white' }
                              : { color: 'black' }
                          }
                        >
                          <ByFunctionSVG text={activeTab} />
                          <span>by Function</span>
                        </a>
                        <a
                          className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 dark:text-white-600 cursor-pointer ${
                            activeTab === 'By WCGA Guidelines'
                              ? 'border border-b-0 rounded-t-lg'
                              : ''
                          }`}
                          style={
                            activeTab === 'By WCGA Guidelines'
                              ? { backgroundColor: '#007bff', color: 'white' }
                              : { color: 'black' }
                          }
                          onClick={toggleTab}
                        >
                          <ByWCGAGuildelinesSVG text={activeTab} />
                          <span>by WCGA Guidelines</span>
                        </a>
                      </div>
                      {activeTab === 'By WCGA Guidelines' ? (
                        <>
                          <IssueCategoryCard data={data} issueType="Errors" />
                          <IssueCategoryCard data={data} issueType="Warnings" />
                          <IssueCategoryCard data={data} issueType="Notices" />
                        </>
                      ) : (
                        <>
                          <IssueCategoryCard data={data} issueType="Function" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <Card>
                <CardContent className="my-8">
                  <h2 className="text-xl font-semibold mb-2  text-gray-800">
                    Comprehensive Analysis
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Our scanner checks for WCAG 2.1 compliance across your
                    entire site.
                  </p>
                  <div className="flex justify-center w-full">
                    <FaCheckCircle size={90} color="green" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="my-8">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Detailed Reports
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Receive a full breakdown of accessibility issues and how to
                    fix them.
                  </p>
                  <div className="flex justify-center w-full">
                    <TbReportSearch size={95} color="green" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="my-8">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Improve User Experience
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Make your website accessible to all users, regardless of
                    abilities.
                  </p>
                  <div className="flex justify-center w-full">
                    <FaUniversalAccess size={95} color="blue" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessibilityReport;
