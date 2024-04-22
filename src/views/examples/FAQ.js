// reactstrap components

import React from "react";
import Faq from "react-faq-component";
import { Card, CardBody, Container } from "reactstrap";
import Header from "components/Headers/Header.js";
import "./styles/faq.css";

const data = {
  title: "Frequently Asked Questions",
  rows: [
    {
      title: "Who is the primary audience of Flood Green Guide?",
      content: `The Flood Green Guide (FGG) is an open-source guidebook and training program. Although the approach and methods can be applied from the national to household levels, the primary target audience is mid-level government, NGO, and technical agencies.`,
    },
    {
      title:
        "What is the watershed perspective used by Flood Green Guide (FGG)?",
      content:
        "The Flood Green Guide (FGG) recommends taking a watershed approach to Flood Risk Management by considering all aspects of the watershed such as biophysical, social, environmental, development and risk-related parameters.",
    },
    {
      title: "How can the boundaries of a watershed be defined?",
      content: `Sometimes referred to as drainage basins or catchment areas, a watershed consists of surface water and the underlying groundwater and is an area of land that drains down slope to the lowest point. Organizations like the United States Geological Survey and HydroSHEDS use elevation data to map watershed boundaries. Because watersheds follow geography instead of jurisdiction, there can be political issues that play a role in how some boundaries are defined. One community’s work to reduce flood risk could shift that risk to a different community. Therefore, it is essential for governments to address floods through a watershed-level approach. `,
    },
    {
      title:
        "What are scales of risk and why are they important to Flood Risk Management (FRM)?",
      content:
        "People’s perceptions, vulnerability, and flood impacts differ depending on the scale of risk. There are four scales considered in the FGG: Watershed scale, Flood Plain scale, Community scale and Household scale. Some believe that nature-based approaches can only be done at the watershed scale, but we believe that even at the household level, nature-based FRM methods can help reduce risk and provide co-benefits. Some small-scale methods can be scaled up to community or floodplain levels. Understanding how households vary in capacity and vulnerability is important to FRM.",
    },
    {
      title:
        "How can communities be empowered and engaged in flood risk management? What is the appropriate participatory platform? ",
      content: (
        <p>
          <p>
            The issues associated with flood management should not be separated
            from the needs of a community. Proper flood risk management must
            include proactive community engagement.
          </p>
          <p>
            It is critical to decide the appropriate level of community
            engagement and why you are engaging with the community. Are you
            simply sharing information or are you seeking equal participation
            and decision-making to truly co-generate flood management? Just as
            there are different objectives for community engagement, community
            engagement methods can take many different forms, ranging from large
            public forums to soliciting feedback online via surveys. One way to
            listen to the range of perspectives in a community is to
            intentionally seek input from a range of community members,
            especially those who may not hold positions of power (e.g. are not
            active volunteers or do not have close links with governmental or
            non-governmental organizations). That includes, but is not limited
            to, engaging marginalized and underrepresented groups.
          </p>
        </p>
      ),
    },
    {
      title:
        "How can we better engage government authorities who are often the ultimate decision-makers on flood policy?   ",
      content: (
        <p>
          {" "}
          <p>
            It is important to engage collaborators, experts, and other
            stakeholders for maximum impact on influencing decision-makers and
            governments.
          </p>
          <p>
            Usually, the small “working groups” involved in the initial
            assessments or design of flood risk management projects are not the
            ultimate decision-makers. They inform and influence the political
            agencies and higher bureaucracy, which make the final decisions.
            Working groups most often include experts and community leaders, and
            should seek support and collaboration with stakeholders from related
            sectors. With a strong and diverse network, there is a better chance
            of engaging policymakers and positively influencing government
            decision-making.
          </p>
          <p>
            Sometimes referred to as “Advocacy Coalitions,” these networks have
            like-minded experts, organizations, and activists that may work
            together for years to positively guide policymakers down certain
            paths. This approach can be useful in mainstreaming nature-based
            methods of flood risk management, where policies may historically
            favor hard-engineering approaches.
          </p>
        </p>
      ),
    },
    {
      title:
        "How can flood risk climate data be obtained when data is limited or unreliable? ",
      content: (
        <p>
          Accessing and applying climate data and modeling to flood risk can be
          a challenge. It’s important to understand the scale and uncertainty of
          climate models. Observed data and local trends can be incorporated
          into FRM decision-making when available. There can be useful
          climate-related data collected by different organizations for other
          purposes, which can be acquired through collaboration and accurately
          interpreted.
        </p>
      ),
    },
    {
      title: "How can riverbank erosion be addressed?  ",
      content: (
        <p>
          <p>
            Riverbank erosion is a complex issue that often arises from factors
            beyond the immediate location of the erosion. These factors can
            include excess flow or energy in the stream, deficiency of sediment
            carried by the stream, and structural instability of the banks. Bank
            erosion is a natural process necessary for floodplain dynamics and
            health, but too much erosion is not good.
          </p>
          <p>
            The first step in addressing bank erosion is to determine if it’s
            caused by an imbalance in water flow or sediment deficiency. If
            erosion is occurring as a part of the natural river process, it
            should not be controlled unless absolutely necessary (e.g. to
            protect an urban area).
          </p>
          <p>
            If an imbalance is the cause of bank erosion, then it should be
            addressed in the flood risk reduction plan. In most cases,
            large-scale runoff management methods such as upper watershed
            restoration are useful. Next, it can be helpful to stabilize
            riverbanks at the site of erosion using nature-based methods such as
            riparian habitat restoration. Hard engineering methods such as
            revetments should be considered as a last option to control
            excessive erosion, as these methods can have negative impacts on
            lateral connectivity of the river and wildlife migration.
          </p>
        </p>
      ),
    },
  ],
};

const styles = {
  // bgColor: 'white',
  // titleTextColor: "blue",
  // rowTitleColor: "blue",
  // rowContentColor: 'grey',
  // arrowColor: "red",
};

const config = {
  animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

// core components

const FAQ = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 " fluid>
        <Card className="shadow">
          <CardBody>
            <div>
              <Faq data={data} styles={styles} config={config} />
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default FAQ;
