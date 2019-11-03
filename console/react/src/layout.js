/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import React from "react";
import {
  Avatar,
  Button,
  ButtonVariant,
  DropdownToggle,
  Page,
  PageHeader,
  SkipToContent,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  PageSidebar
} from "@patternfly/react-core";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import accessibleStyles from "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import { css } from "@patternfly/react-styles";
import { PowerOffIcon } from "@patternfly/react-icons";
import DropdownMenu from "./DropdownMenu";
import ConnectPage from "./connectPage";
import DashboardPage from "./overview/dashboard/dashboardPage";
import OverviewTablePage from "./overview/overviewTablePage";
import DetailsTablePage from "./detailsTablePage";
import EntitiesPage from "./details/enitiesPage";
import TopologyPage from "./topology/topologyPage";
import MessageFlowPage from "./chord/chordPage";
import LogDetails from "./overview/logDetails";
import { QDRService } from "./qdrService";
import ConnectForm from "./connect-form";
import NotificationDrawer from "./notificationDrawer";
import { utils } from "./amqp/utilities";
const avatarImg = require("./assets/img_avatar.svg");

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      connectPath: "",
      activeGroup: "overview",
      activeItem: "dashboard",
      isNavOpenDesktop: true,
      isNavOpenMobile: false,
      isMobileView: false,
      user: "anonymous"
    };
    this.isDropdownOpen = false;

    this.hooks = { setLocation: this.setLocation };
    this.service = new QDRService(this.hooks);
    this.nav = {
      overview: [
        { name: "dashboard" },
        { name: "routers", pre: true },
        { name: "addresses", pre: true },
        { name: "links", pre: true },
        { name: "connections", pre: true },
        { name: "logs", pre: true }
      ],
      visualizations: [
        { name: "topology" },
        { name: "flow", title: "Message flow" }
      ],
      details: [{ name: "entities" }, { name: "schema" }]
    };
  }

  // the connection to the routers was lost
  setLocation = whatHappened => {
    if (whatHappened === "disconnect") {
      this.setState({ connected: false });
    } else if (whatHappened === "reconnect") {
      this.handleConnectCancel();
      const connectPath = this.lastConnectPath || "/";
      this.lastConnectPath = connectPath;
      this.setState({
        connectPath,
        connected: true
      });
    }
  };

  onDropdownToggle = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.dropdownRef.show(this.isDropdownOpen);
  };

  handleDropdownLogout = () => {
    // called from the user dropdown menu
    // The only menu item is logout
    // We must have been connected to get here
    this.handleConnect();
    this.dropdownRef.show(false);
    this.isDropdownOpen = false;
  };

  handleConnect = (connectPath, connectInfo) => {
    if (this.state.connected) {
      this.setState({ connectPath: "", connected: false }, () => {
        this.handleConnectCancel();
        this.service.disconnect();
        this.handleAddNotification(
          "event",
          "Manually disconnected",
          new Date(),
          "info"
        );
      });
    } else {
      const connectOptions = JSON.parse(JSON.stringify(connectInfo));
      if (connectOptions.username === "") connectOptions.username = undefined;
      if (connectOptions.password === "") connectOptions.password = undefined;
      connectOptions.reconnect = true;

      this.service.connect(connectOptions).then(
        r => {
          this.schema = this.service.schema;
          if (connectPath === "/") connectPath = "/dashboard";
          const activeItem = connectPath.split("/").pop();
          // find the active group for this item
          let activeGroup = "overview";
          for (const group in this.nav) {
            if (this.nav[group].some(item => item.name === activeItem)) {
              activeGroup = group;
              break;
            }
          }
          this.handleConnectCancel();
          this.handleAddNotification("event", "Connected", new Date(), "info");

          this.setState({
            activeItem,
            activeGroup,
            connected: true,
            connectPath
          });
        },
        e => {
          console.log(e);
        }
      );
    }
  };

  onNavSelect = (result, connectPath) => {
    this.lastConnectPath = connectPath || this.state.connectPath;
    this.setState({
      activeItem: result.itemId,
      activeGroup: result.groupId,
      connectPath: ""
    });
  };

  toggleConnectForm = () => {
    this.isConnectFormOpen = !this.isConnectFormOpen;
    this.connectFormRef.show(this.isConnectFormOpen);
  };

  handleConnectCancel = () => {
    this.connectFormRef.show(false);
    this.isConnectFormOpen = false;
  };

  onNavToggleDesktop = () => {
    this.setState({
      isNavOpenDesktop: !this.state.isNavOpenDesktop
    });
  };

  onNavToggleMobile = () => {
    this.setState({
      isNavOpenMobile: !this.state.isNavOpenMobile
    });
  };

  onPageResize = ({ mobileView, windowSize }) => {
    this.setState({
      isMobileView: mobileView
    });
  };

  handleUserMenuHide = () => {
    this.isDropdownOpen = false;
    this.dropdownRef.show(false);
  };

  isConnected = () => {
    return this.state.connected;
  };

  handleAddNotification = (section, message, timestamp, severity) => {
    if (this.notificationRef) {
      this.notificationRef.addNotification({
        section,
        message,
        timestamp,
        severity
      });
    }
  };

  render() {
    const { activeItem, activeGroup } = this.state;
    const { isNavOpenDesktop, isNavOpenMobile, isMobileView } = this.state;

    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav" className="pf-m-dark">
        <NavList>
          {Object.keys(this.nav).map(section => {
            const Section = utils.Icap(section);
            return (
              <NavExpandable
                title={Section}
                groupId={section}
                isActive={activeGroup === section}
                isExpanded
                key={section}
              >
                {this.nav[section].map(item => {
                  const key = item.name;
                  return (
                    <NavItem
                      groupId={section}
                      itemId={key}
                      isActive={activeItem === key}
                      key={key}
                    >
                      <Link to={`/${item.pre ? section + "/" : ""}${key}`}>
                        {item.title ? item.title : utils.Icap(key)}
                      </Link>
                    </NavItem>
                  );
                })}
              </NavExpandable>
            );
          })}
        </NavList>
      </Nav>
    );
    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup
          className={css(
            accessibleStyles.screenReader,
            accessibleStyles.visibleOnLg
          )}
        >
          <ToolbarItem>
            <Button
              id="connectButton"
              onClick={this.toggleConnectForm}
              aria-label="Toggle Connect Form"
              variant={ButtonVariant.plain}
            >
              <PowerOffIcon />
            </Button>
          </ToolbarItem>
          <ToolbarItem className="notification-button">
            <NotificationDrawer ref={el => (this.notificationRef = el)} />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem
            className={css(
              accessibleStyles.screenReader,
              accessibleStyles.visibleOnMd
            )}
          >
            <DropdownToggle
              className="user-button"
              onToggle={this.onDropdownToggle}
            >
              {this.state.user}
            </DropdownToggle>
            <DropdownMenu
              ref={el => (this.dropdownRef = el)}
              handleContextHide={this.handleUserMenuHide}
              handleDropdownLogout={this.handleDropdownLogout}
              isConnected={this.isConnected}
              parentClass="user-button"
            />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );

    const Header = (
      <PageHeader
        className="topology-header"
        logo={<span className="logo-text">Apache Qpid Dispatch Console</span>}
        toolbar={PageToolbar}
        avatar={<Avatar src={avatarImg} alt="Avatar image" />}
        showNavToggle
        onNavToggle={
          isMobileView ? this.onNavToggleMobile : this.onNavToggleDesktop
        }
        isNavOpen={isMobileView ? isNavOpenMobile : isNavOpenDesktop}
      />
    );
    const pageId = "main-content-page-layout-manual-nav";
    const PageSkipToContent = (
      <SkipToContent href={`#${pageId}`}>Skip to Content</SkipToContent>
    );

    const sidebar = PageNav => {
      if (this.state.connected) {
        return (
          <PageSidebar
            nav={PageNav}
            isNavOpen={isMobileView ? isNavOpenMobile : isNavOpenDesktop}
            theme="dark"
          />
        );
      }
      return <React.Fragment />;
    };

    // don't allow access to this component unless we are logged in
    const PrivateRoute = ({ component: Component, path: rpath, ...more }) => (
      <Route
        path={rpath}
        {...(more.exact ? "exact" : "")}
        render={props =>
          this.state.connected ? (
            <Component
              service={this.service}
              handleAddNotification={this.handleAddNotification}
              {...props}
              {...more}
            />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );

    // When we need to display a different component(page),
    // we render a <Redirect> object
    const redirectAfterConnect = () => {
      let { connectPath } = this.state;
      if (connectPath !== "") {
        if (connectPath === "/login") connectPath = "/";
        this.lastConnectPath = connectPath;
        return <Redirect to={connectPath} />;
      }
      return <React.Fragment />;
    };

    const connectForm = () => {
      return (
        <ConnectForm
          ref={el => (this.connectFormRef = el)}
          isConnectFormOpen={this.isConnectFormOpen}
          fromPath={"/"}
          handleConnect={this.handleConnect}
          handleConnectCancel={this.handleConnectCancel}
          isConnected={this.state.connected}
        />
      );
    };

    return (
      <Router>
        {redirectAfterConnect()}
        <Page
          header={Header}
          sidebar={sidebar(PageNav)}
          onPageResize={this.onPageResize}
          skipToContent={PageSkipToContent}
          mainContainerId={pageId}
        >
          {connectForm()}
          <Switch>
            <PrivateRoute path="/" exact component={DashboardPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute
              path="/overview/:entity"
              component={OverviewTablePage}
            />
            <PrivateRoute
              path="/details"
              schema={this.schema}
              component={DetailsTablePage}
            />
            <PrivateRoute path="/topology" component={TopologyPage} />
            <PrivateRoute path="/flow" component={MessageFlowPage} />
            <PrivateRoute path="/logs" component={LogDetails} />
            <PrivateRoute path="/entities" component={EntitiesPage} />
            <Route
              path="/login"
              render={props => (
                <ConnectPage {...props} handleConnect={this.handleConnect} />
              )}
            />
          </Switch>
        </Page>
      </Router>
    );
  }
}

export default PageLayout;

/*          <ToolbarItem>
            <ConnectForm prefix="toolbar" handleConnect={this.handleConnect} />
          </ToolbarItem>



            <Dropdown
              isPlain
              position="right"
              onSelect={this.onDropdownSelect}
              isOpen={isDropdownOpen}
              toggle={
                <DropdownToggle onToggle={this.onDropdownToggle}>
                  anonymous
                </DropdownToggle>
              }
              dropdownItems={userDropdownItems}
            />
          */
