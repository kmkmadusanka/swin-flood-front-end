// reactstrap components
import ChatBox from "react-chat-plugin";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import Header from "components/Headers/Header.js";
import "./styles/discussion.css";

const Discussion = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [attr, setAttr] = useState({
    showChatbox: false,
    showIcon: true,
    messages: [
      {
        author: {
          username: "Community",
          id: 2,
          avatarUrl: "https://i.imgur.com/hyBNO8F.png",
        },
        text: "Hi",
        type: "text",
        timestamp: 1578366393250,
      },
      {
        author: {
          username: "You",
          id: 1,
          avatarUrl: "https://i.imgur.com/V3KudV0.png",
        },
        text: <p>I am in a Emergency situation please help!</p>,
        type: "text",
        timestamp: 1578366425250,
        buttons: [
          {
            type: "URL",
            title: "Location",
            payload: `http://maps.google.com/maps?q=${position.latitude},${position.longitude}`,
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (localStorage.getItem('sos') !== undefined && localStorage.getItem('sos') === 'clicked') {
      setAttr({
        ...attr,
        messages: attr.messages.concat({
          author: {
            username: "You",
            id: 1,
            avatarUrl: "https://i.imgur.com/V3KudV0.png",
          },
          text: (
            <p>
              <p ><p>Hi all,</p>
                <p>I am in a <strong>Emergency</strong> situation</p>
                <p>Could you please help me to get resolve this situation. My location is attached with folowing button</p>
              </p>
            </p>
          ),
          buttons: [
            {
              type: "URL",
              title: "Location",
              payload: `http://maps.google.com/maps?q=${position.latitude},${position.longitude}`,
            },
          ],
          type: "text",
          timestamp: +new Date(),
        }),
      });
      localStorage.removeItem('sos')
    }
  }, []);

  const handleOnSendMessage = (message) => {
    setAttr({
      ...attr,
      messages: attr.messages.concat({
        author: {
          username: "You",
          id: 1,
          avatarUrl: "https://i.imgur.com/V3KudV0.png",
        },
        text: (
          <p>
            <p>{message}</p>
          </p>
        ),
        buttons: [
          {
            type: "URL",
            title: "Location",
            payload: `http://maps.google.com/maps?q=${position.latitude},${position.longitude}`,
          },
        ],
        type: "text",
        timestamp: +new Date(),
      }),
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 " fluid>
        <Card className="shadow">
          <CardBody>
            <ChatBox
              onSendMessage={handleOnSendMessage}
              userId={1}
              messages={attr.messages}
              width={"100vw"}
              showTypingIndicator={true}
            />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Discussion;
