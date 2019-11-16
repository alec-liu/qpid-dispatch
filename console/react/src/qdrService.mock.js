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

import { utils } from "./amqp/utilities";

const methodResults = {
  context: {
    message:
    {
      application_properties: {
        statusCode: 200,
        statusDescription: "fake response was OK"
      }
    }
  }
}

const nodeInfo = {
  "amqp:/_topo/0/A/$management": {
    "connection": {
      "attributeNames": [
        "name",
        "identity",
        "host",
        "role",
        "dir",
        "container",
        "sasl",
        "isAuthenticated",
        "user",
        "isEncrypted",
        "sslProto",
        "sslCipher",
        "properties",
        "sslSsf",
        "tenant",
        "type",
        "ssl",
        "opened",
        "active",
        "adminStatus",
        "operStatus"
      ],
      "results": [
        [
          "connection/127.0.0.1:41076",
          "1",
          "127.0.0.1:41076",
          "inter-router",
          "in",
          "D",
          "ANONYMOUS",
          true,
          "anonymous",
          false,
          null,
          null,
          {
            "product": "qpid-dispatch-router",
            "version": "1.9.0-SNAPSHOT",
            "qd.conn-id": 622
          },
          0,
          null,
          "org.apache.qpid.dispatch.connection",
          false,
          true,
          true,
          "enabled",
          "up"
        ],
        [
          "connection/127.0.0.1:34276",
          "3",
          "127.0.0.1:34276",
          "normal",
          "in",
          "87c75b00-3eae-4289-b2ef-7faae85682b3",
          "ANONYMOUS",
          true,
          "anonymous",
          false,
          null,
          null,
          {},
          0,
          null,
          "org.apache.qpid.dispatch.connection",
          false,
          true,
          true,
          "enabled",
          "up"
        ],
        [
          "connection/::1",
          "11",
          "::1",
          "normal",
          "in",
          "d5bf3869-55dc-9c4b-8580-ae0c51d09d82",
          null,
          false,
          "anonymous",
          false,
          null,
          null,
          {
            "console_identifier": "Dispatch console"
          },
          0,
          null,
          "org.apache.qpid.dispatch.connection",
          false,
          true,
          true,
          "enabled",
          "up"
        ]
      ],
      "timestamp": "2019-11-14T14:46:18.732Z"
    }
  },
  "amqp:/_topo/0/D/$management": {
    "connection": {
      "attributeNames": [
        "name",
        "identity",
        "host",
        "role",
        "dir",
        "container",
        "sasl",
        "isAuthenticated",
        "user",
        "isEncrypted",
        "sslProto",
        "sslCipher",
        "properties",
        "sslSsf",
        "tenant",
        "type",
        "ssl",
        "opened",
        "active",
        "adminStatus",
        "operStatus"
      ],
      "results": [
        [
          "connection/0.0.0.0:2000",
          "622",
          "0.0.0.0:2000",
          "inter-router",
          "out",
          "A",
          "ANONYMOUS",
          true,
          null,
          false,
          null,
          null,
          {
            "product": "qpid-dispatch-router",
            "version": "1.9.0-SNAPSHOT",
            "qd.conn-id": 1
          },
          0,
          null,
          "org.apache.qpid.dispatch.connection",
          false,
          true,
          true,
          "enabled",
          "up"
        ]
      ],
      "timestamp": "2019-11-14T14:46:18.734Z"
    }
  }
}

export const mockService = ({ onSendMethod }) => {
  const cbSendMethod = onSendMethod ? onSendMethod : () => { }
  return {
    management: {
      connection:
      {
        sendMethod: () => {
          cbSendMethod();
          return Promise.resolve(methodResults)
        }
      },
      topology: {
        setUpdateEntities: () => { },
        ensureAllEntities: () => { },
        startUpdating: () => { },
        stopUpdating: () => { },
        addChangedAction: () => { },
        delChangedAction: () => { },
        addUpdatedAction: () => { },
        delUpdatedAction: () => { },
        fetchAllEntities: () => { },
        nodeInfo: () => (nodeInfo),
        _nodeInfo: nodeInfo
      }
    },
    utilities: utils,
    connect: () => Promise.resolve(),
    schema: {
      "prefix": "org.apache.qpid.dispatch",
      "entityTypes": {
        "dummy": {
          "operations": [
            "CREATE",
            "READ",
            "UPDATE",
            "DELETE",
            "CALLME"
          ],
          "attributes": {
            "num1": {
              "type": "integer"
            },
            "num2": {
              "type": "integer"
            },
            "arg1": {
              "type": "string"
            },
            "arg2": {
              "type": "string"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.dummy",
          "description": "Dummy entity for test purposes."
        },
        "binding": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "matchedCount": {
              "type": "integer",
              "description": "Total number of deliveries that matched this binding."
            },
            "bindingKey": {
              "type": "string",
              "description": "Pattern to compare against incoming message's subject.  The key is a string of zero or more tokens and wildcards. The format depends on the matchMethod configured for the exchange. For AMQP each token is delimited by the '.' character and wild-card tokens '*' matches a single token and '#' matches zero or more tokens. For MQTT each token is delimited by the '/' character and wildcard tokens '+' matches a single token and '#' matches zero or more tokens at the end of the topic. If a key is not provided the binding will match all messages arriving at the exchange (fanout behavior)."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "nextHopAddress": {
              "required": true,
              "type": "string",
              "description": "The address to forward the message to when the message's topic string matches the binding key pattern.  This address is used by message consumers as the source of incoming messages."
            },
            "exchangeName": {
              "required": true,
              "type": "string",
              "description": "The name of the exchange to bind."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "nextHopPhase": {
              "type": "integer",
              "description": "The address phase used when forwarding messages that match this binding."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.config.binding",
          "description": "[EXPERIMENTAL] Defines a keyed next hop binding for a topic exchange. The subject field of the messages arriving at the exchange is compared against the binding's key value using the exchange's matchMethod.  If the subject matches the key the message is forwarded to the nextHopAddress. The nextHopAddress overrides the message's original destination."
        },
        "entity": {
          "attributes": {
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.entity",
          "description": "Base entity type for all entities."
        },
        "router.connection.linkRoute": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "pattern": {
              "required": true,
              "type": "string",
              "description": "A wildcarded pattern for address matching. Incoming addresses are matched against this pattern. Matching addresses use the configured settings. The pattern consists of one or more tokens separated by a forward slash '/'. A token can be one of the following: a * character, a # character, or a sequence of characters that do not include /, *, or #.  The * token matches any single token.  The # token matches zero or more tokens. * has higher precedence than #, and exact match has the highest precedence."
            },
            "direction": {
              "required": true,
              "type": [
                "in",
                "out"
              ],
              "description": "The permitted direction of links: 'in' means client senders; 'out' means client receivers"
            },
            "containerId": {
              "type": "string",
              "description": "Name of the container which has instantiated this linkRoute."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.connection.linkRoute",
          "description": "[EXPERIMENTAL] A linkRoute that is scoped to the connection that created it. Connection linkRoutes only exist within the context of a connection and when the connection is closed, they vanish. This differs from configured linkRoutes (router.config.linkRoute) which remain configured should their associated connection restart. Connection linkRoutes may be used by a client to create link-routed message flows that are automatically removed when the client disconnects.  Note well that connection.linkRoute cannot be declared in a configuration file - they must be created at run time via management operations over the connection which they are to be used. Connection linkRoutes are only visible to management access that is via the containing connection."
        },
        "sslProfile": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "certFile": {
              "type": "path",
              "description": "The absolute path to the file containing the PEM-formatted public certificate to be used on the local end of any connections using this profile."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "uidNameMappingFile": {
              "type": "string",
              "description": "The absolute path to the file containing the unique id to display name mapping"
            },
            "ciphers": {
              "type": "string",
              "description": "Specifies the enabled ciphers so the SSL Ciphers can be hardened. In other words, use this field to disable weak ciphers. The ciphers are specified in the format understood by the OpenSSL library. For example, ciphers can be set to ALL:!aNULL:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP; -- The full list of allowed ciphers can be viewed using the openssl ciphers command"
            },
            "uidFormat": {
              "type": "string",
              "description": "A list of x509 client certificate fields that will be used to build a string that will uniquely identify the client certificate owner. For e.g. a value of 'cou' indicates that the uid will consist of c - common name concatenated with o - organization-company name concatenated with u - organization unit; or a value of 'o2' indicates that the uid will consist of o (organization name) concatenated with 2 (the sha256 fingerprint of the entire certificate) . Allowed values can be any combination of 'c'( ISO3166 two character country code), 's'(state or province), 'l'(Locality; generally - city), 'o'(Organization - Company Name), 'u'(Organization Unit - typically certificate type or brand), 'n'(CommonName - typically a user name for client certificates) and '1'(sha1 certificate fingerprint, as displayed in the fingerprints section when looking at a certificate with say a web browser is the hash of the entire certificate) and 2 (sha256 certificate fingerprint) and 5 (sha512 certificate fingerprint). The user identifier (uid) that is generated based on the uidFormat is a string which has a semi-colon as a separator between the components"
            },
            "privateKeyFile": {
              "type": "path",
              "description": "The absolute path to the file containing the PEM-formatted private key for the above certificate."
            },
            "protocols": {
              "type": "string",
              "description": "The TLS protocols that this sslProfile can use. You can specify a list of one or more of TLSv1, TLSv1.1, or TLSv1.2. To specify multiple protocols, separate the protocols with a space. For example, to permit the sslProfile to use TLS v1.1 and TLS v1.2 only, you would set the value to TLSv1.1 TLSv1.2. If you do not specify a value, the sslProfile uses the TLS protocol specified by the system-wide configuration."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "passwordFile": {
              "type": "path",
              "description": "If the above private key is password protected, this is the absolute path to a file containing the password that unlocks the certificate key. This file should be permission protected to limit access"
            },
            "caCertFile": {
              "type": "path",
              "description": "The absolute path to the database that contains the public certificates of trusted certificate authorities (CA)."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.sslProfile",
          "description": "Attributes for setting TLS/SSL configuration for connections."
        },
        "linkRoute": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "direction": {
              "required": true,
              "type": [
                "in",
                "out"
              ],
              "description": "The permitted direction of links: 'in' means client senders; 'out' means client receivers"
            },
            "addExternalPrefix": {
              "type": "string",
              "description": "add the specified prefix to the address of the remote terminus on the route container link"
            },
            "operStatus": {
              "type": [
                "inactive",
                "active"
              ],
              "description": "The operational status of this linkRoute: inactive - The remote container is not connected; active - the remote container is connected and ready to accept link routed attachments."
            },
            "pattern": {
              "type": "string",
              "description": "A wildcarded pattern for address matching. Link addresses are matched against this pattern. Matching addresses use the configured settings. The pattern consists of one or more tokens separated by a forward slash '/'. A token can be one of the following: a * character, a # character, or a sequence of characters that do not include /, *, or #.  The * token matches any single token.  The # token matches zero or more tokens. * has higher precedence than #, and exact match has the highest precedence. Cannot be used with the prefix attribute."
            },
            "connection": {
              "type": "string",
              "description": "The name from a connector or listener. Only one of containerId or connection should be specified for a linkRoute. Specifying both will result in the linkRoute not being created."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "prefix": {
              "type": "string",
              "description": "The address prefix for the configured settings. Cannot be used with the pattern attribute."
            },
            "distribution": {
              "default": "linkBalanced",
              "type": [
                "linkBalanced"
              ],
              "description": "Treatment of traffic associated with the address"
            },
            "delExternalPrefix": {
              "type": "string",
              "description": "remove the specified prefix to the address of the remote terminus on the route container link"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "containerId": {
              "type": "string",
              "description": "ContainerID for the target container. Only one of containerId or connection should be specified for a linkRoute. Specifying both will result in the linkRoute not being created."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.config.linkRoute",
          "description": "Entity type for link-route configuration.  This is used to identify remote containers that shall be destinations for routed link-attaches.  The link-routing configuration applies to an addressing space defined by a prefix or a pattern."
        },
        "allocator": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "heldByThreads": {
              "graph": true,
              "type": "integer"
            },
            "typeSize": {
              "type": "integer"
            },
            "transferBatchSize": {
              "type": "integer"
            },
            "globalFreeListMax": {
              "graph": true,
              "type": "integer"
            },
            "batchesRebalancedToGlobal": {
              "graph": true,
              "type": "integer"
            },
            "typeName": {
              "type": "string"
            },
            "batchesRebalancedToThreads": {
              "graph": true,
              "type": "integer"
            },
            "totalFreeToHeap": {
              "graph": true,
              "type": "integer"
            },
            "totalAllocFromHeap": {
              "graph": true,
              "type": "integer"
            },
            "localFreeListMax": {
              "graph": true,
              "type": "integer"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.allocator",
          "description": "Memory allocation pool."
        },
        "management": {
          "operations": [
            "GET-SCHEMA",
            "GET-JSON-SCHEMA",
            "GET-LOG",
            "PROFILE",
            "QUERY",
            "GET-TYPES",
            "GET-ANNOTATIONS",
            "GET-OPERATIONS",
            "GET-ATTRIBUTES",
            "GET-MGMT-NODES",
            "READ"
          ],
          "attributes": {
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "singleton": true,
          "fullyQualifiedType": "org.apache.qpid.dispatch.management",
          "description": "Qpid dispatch router extensions to the standard org.amqp.management interface."
        },
        "log": {
          "operations": [
            "UPDATE",
            "READ"
          ],
          "attributes": {
            "outputFile": {
              "type": "string",
              "description": "Where to send log messages. Can be 'stderr', 'stdout', 'syslog' or a file name."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "module": {
              "required": true,
              "type": [
                "ROUTER",
                "ROUTER_CORE",
                "ROUTER_HELLO",
                "ROUTER_LS",
                "ROUTER_MA",
                "MESSAGE",
                "SERVER",
                "AGENT",
                "AUTHSERVICE",
                "CONTAINER",
                "ERROR",
                "POLICY",
                "HTTP",
                "CONN_MGR",
                "PYTHON",
                "DEFAULT"
              ],
              "description": "Module to configure. The special module 'DEFAULT' specifies defaults for all modules."
            },
            "enable": {
              "type": "string",
              "description": "Levels are: trace, debug, info, notice, warning, error, critical. The enable string is a comma-separated list of levels. A level may have a trailing '\\+' to enable that level and above. For example 'trace,debug,warning+' means enable trace, debug, warning, error and critical. The value 'none' means disable logging for the module."
            },
            "includeSource": {
              "type": "boolean",
              "description": "Include source file and line number in log messages."
            },
            "includeTimestamp": {
              "type": "boolean",
              "description": "Include timestamp in log messages."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.log",
          "description": "Configure logging for a particular module. You can use the `UPDATE` operation to change log settings while the router is running."
        },
        "vhostUserGroupSettings": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "allowFallbackLinks": {
              "default": true,
              "type": "boolean",
              "description": "Whether this connection is allowed to claim 'qd.fallback' capability for attached links.  This allows endpoints to act as fallback destinations for addresses that have fallback capability enabled."
            },
            "allowAnonymousSender": {
              "type": "boolean",
              "description": "Whether this connection is allowed to create sending links if the sender does not provide a target address. By prohibiting anonymous senders, the router only needs to verify once, when the link is created, that the sender is permitted to send messages to the target address. The router does not need to verify each message that is sent on the link. A value of 'true' means that users may send messages to any address. Allowing anonymous senders can also decrease performance: if the sender does not specify a target address, then the router must parse each message to determine how to route it."
            },
            "maxReceivers": {
              "default": 2147483647,
              "type": "integer",
              "description": "The maximum number of receiving links that may be created on this connection. A value of '0' disables all receiver links."
            },
            "users": {
              "required": true,
              "type": "string",
              "description": "A list of authenticated users for this user group. Use commas to separate multiple users. A user may belong to only one vhost user group."
            },
            "sourcePattern": {
              "type": "string",
              "description": "A wildcarded pattern for matching source addresses from which users in this group may receive messages. The pattern consists of one or more tokens separated by a forward slash '/'. A token can be one of the following: a * character, a # character, or a sequence of characters that do not include /, *, or #.  The * token matches any single token.  The # token matches zero or more tokens. * has higher precedence than #, and exact match has the highest precedence. To specify multiple addresses, separate the addresses with either a comma or a space. You can use the text string '${user}' in a token to specify an address that contains a user's authenticated user name. If you do not specify any addresses, users in this group are not allowed to receive messages from any addresses. You may specify attributes 'sources' or 'sourcePattern' but not both at the same time."
            },
            "allowWaypointLinks": {
              "default": true,
              "type": "boolean",
              "description": "Whether this connection is allowed to claim 'waypoint.N' capability for attached links.  This allows endpoints to act as waypoints without needing auto-links."
            },
            "maxSessionWindow": {
              "default": 1638400,
              "type": "integer",
              "description": "The incoming capacity for new AMQP sessions, measured in octets. Non-zero policy values overwrite values specified for a listener object (AMQP Begin, incoming-window)."
            },
            "allowUserIdProxy": {
              "type": "boolean",
              "description": "Whether this connection is allowed to send messages with a user ID that is different than the connection's authenticated user name."
            },
            "maxFrameSize": {
              "default": 16384,
              "type": "integer",
              "description": "The largest frame, in bytes, that may be sent on this connection. Non-zero policy values overwrite values specified for a listener object (AMQP Open, max-frame-size)."
            },
            "targets": {
              "type": "string",
              "description": "A list of target addresses to which users in this group may send messages. To specify multiple addresses, separate the addresses with either a comma or a space. If you do not specify any addresses, users in this group are not allowed to send messages to any addresses. You can use the substitution token '${user}' to specify an address that contains a user's authenticated user name. You can use an asterisk ('*') wildcard to match one or more characters in an address. However, this wildcard is only recognized if it is the last character in the address name. You may specify attributes 'targets' or 'targetPattern' but not both at the same time."
            },
            "sources": {
              "type": "string",
              "description": "A list of source addresses from which users in this group may receive messages. To specify multiple addresses, separate the addresses with either a comma or a space. If you do not specify any addresses, users in this group are not allowed to receive messages from any addresses. You can use the substitution token '${user}' to specify an address that contains a user's authenticated user name. You can use an asterisk ('*') wildcard to match one or more characters in an address. However, this wildcard is only recognized if it is the last character in the address name. You may specify attributes 'sources' or 'sourcePattern' but not both at the same time."
            },
            "allowAdminStatusUpdate": {
              "default": true,
              "type": "boolean",
              "description": "Whether this connection is allowed to update the admin status of other connections. Note: Inter-router connections cannot be deleted at any time."
            },
            "allowDynamicLinkRoutes": {
              "default": true,
              "type": "boolean",
              "description": "Whether this connection is allowed to dynamically create connection-scoped link route destinations."
            },
            "allowDynamicSource": {
              "type": "boolean",
              "description": "Whether this connection is allowed to create dynamic receiving links (links to resources that do not exist on the peer). A value of 'true' means that users are able to automatically create resources on the peer system."
            },
            "remoteHosts": {
              "required": true,
              "type": "string",
              "description": "A list of remote hosts from which the users may connect. A host can be a hostname, IP address, or IP address range. Use commas to separate multiple hosts. To allow access from all remote hosts, specify a wildcard '*'. To deny access from all remote hosts, leave this attribute blank."
            },
            "maxSenders": {
              "default": 2147483647,
              "type": "integer",
              "description": "The maximum number of sending links that may be created on this connection. A value of '0' disables all sender links."
            },
            "targetPattern": {
              "type": "string",
              "description": "A wildcarded pattern for matching target addresses to which users in this group may send messages. The pattern consists of one or more tokens separated by a forward slash '/'. A token can be one of the following: a * character, a # character, or a sequence of characters that do not include /, *, or #.  The * token matches any single token.  The # token matches zero or more tokens. * has higher precedence than #, and exact match has the highest precedence. To specify multiple addresses, separate the addresses with either a comma or a space. You can use the text string '${user}' in a token to specify an address that contains a user's authenticated user name. If you do not specify any addresses, users in this group are not allowed to send messages to any addresses. You may specify attributes 'targets' or 'targetPattern' but not both at the same time."
            },
            "maxSessions": {
              "default": 32768,
              "type": "integer",
              "description": "The maximum number of sessions that may be created on this connection. Non-zero policy values overwrite values specified for a listener object (AMQP Open, channel-max)."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.vhostUserGroupSettings",
          "description": "Policy settings for users connecting to a vhost. Configuration files including this section must use .json format."
        },
        "vhostStats": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "perHostState": {
              "type": "map",
              "description": "A map where the key is the host name and the value is a list of the host's connections."
            },
            "hostname": {
              "type": "string",
              "description": "The vhost name."
            },
            "perUserState": {
              "type": "map",
              "description": "A map where the key is the authenticated user name and the value is a list of the user's connections."
            },
            "sessionDenied": {
              "graph": true,
              "type": "integer"
            },
            "connectionsApproved": {
              "graph": true,
              "type": "integer"
            },
            "receiverDenied": {
              "graph": true,
              "type": "integer"
            },
            "connectionsCurrent": {
              "graph": true,
              "type": "integer"
            },
            "senderDenied": {
              "graph": true,
              "type": "integer"
            },
            "connectionsDenied": {
              "graph": true,
              "type": "integer"
            },
            "id": {
              "type": "string",
              "description": "The vhost name. DEPRECATED - use 'hostname' instead."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.vhostStats",
          "description": "Virtual host connection and access statistics."
        },
        "connector": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "stripAnnotations": {
              "default": "both",
              "type": [
                "in",
                "out",
                "both",
                "no"
              ],
              "description": "['in', 'out', 'both', 'no'] in: Strip the dispatch router specific annotations only on ingress; out: Strip the dispatch router specific annotations only on egress; both: Strip the dispatch router specific annotations on both ingress and egress; no - do not strip dispatch router specific annotations"
            },
            "saslUsername": {
              "type": "string",
              "description": "The user name that the connector is using to connect to a peer."
            },
            "allowRedirect": {
              "default": true,
              "type": "boolean",
              "description": "Allow the peer to redirect this connection to another address."
            },
            "idleTimeoutSeconds": {
              "default": 16,
              "type": "integer",
              "description": "The idle timeout, in seconds, for connections through this connector.  If no frames are received on the connection for this time interval, the connection shall be closed."
            },
            "maxSessionFrames": {
              "type": "integer",
              "description": "Session incoming window measured in transfer frames for sessions created on this connection. This is the number of transfer frames that may simultaneously be in flight for all links in the session. Setting this value to zero selects the default session window size. Policy settings will not overwrite this value. The numerical product of maxFrameSize and maxSessionFrames may not exceed 2^31-1. If (maxFrameSize x maxSessionFrames) exceeds 2^31-1 then maxSessionFrames is reduced to (2^31-1 / maxFrameSize). maxSessionFrames has a minimum value of 1.  Defaults to 0 (unlimited window)."
            },
            "cost": {
              "default": 1,
              "type": "integer",
              "description": "For the 'inter-router' role only.  This value assigns a cost metric to the inter-router connection.  The default (and minimum) value is one.  Higher values represent higher costs.  The cost is used to influence the routing algorithm as it attempts to use the path with the lowest total cost from ingress to egress."
            },
            "port": {
              "default": "amqp",
              "type": "string",
              "description": "Port number or symbolic service name."
            },
            "policyVhost": {
              "type": "string",
              "description": "A connector may optionally define a policy to restrict the remote container to access only specific resources. This attribute defines the name of the policy vhost for this connector. Within the vhost the connector will use the vhost policy settings from user group '$connector'. If the vhost policy is absent or if the user group '$connector' within that policy is absent then the connector will fail to start.  In policy specified via connector attribute 'policyVhost' the following vhostUserGroupSettings attributes are unused:  'users', 'remoteHosts', 'maxFrameSize', 'maxSessionWindow', 'maxSessions'."
            },
            "saslMechanisms": {
              "type": "string",
              "description": "Space separated list of accepted SASL authentication mechanisms."
            },
            "linkCapacity": {
              "type": "integer",
              "description": "The capacity of links within this connection, in terms of message deliveries.  The capacity is the number of messages that can be in-flight concurrently for each link."
            },
            "role": {
              "default": "normal",
              "type": [
                "normal",
                "inter-router",
                "route-container",
                "edge"
              ],
              "description": "The role of an established connection. In the normal role, the connection is assumed to be used for AMQP clients that are doing normal message delivery over the connection.  In the inter-router role, the connection is assumed to be to another router in the network.  Inter-router discovery and routing protocols can only be used over inter-router connections. route-container role can be used for router-container connections, for example, a router-broker connection.  In the edge role, the connection is assumed to be between and edge router and an interior router."
            },
            "saslPassword": {
              "type": "string",
              "description": "The password that the connector is using to connect to a peer."
            },
            "maxSessions": {
              "default": 32768,
              "type": "integer",
              "description": "The maximum number of sessions that can be simultaneously active on the connection. Setting this value to zero selects the default number of sessions. Policy settings will not overwrite this value. Defaults to 32768."
            },
            "messageLoggingComponents": {
              "default": "none",
              "type": "string",
              "description": "A comma separated list that indicates which components of the message should be logged (no spaces allowed between list components). Defaults to 'none' (log nothing). If you want all properties and application properties of the message logged use 'all'. Specific components of the message can be logged by indicating the components via a comma separated list. The components are message-id, user-id, to, subject, reply-to, correlation-id, content-type, content-encoding, absolute-expiry-time, creation-time, group-id, group-sequence, reply-to-group-id, app-properties. The application-data part of the bare message will not be logged. This log message is written to the MESSAGE logging module. In the 'log' entity, set 'module' property to MESSAGE or DEFAULT and 'enable' to trace+ to see this log message"
            },
            "host": {
              "default": "127.0.0.1",
              "type": "string",
              "description": "IP address: ipv4 or ipv6 literal or a host name"
            },
            "protocolFamily": {
              "type": [
                "IPv4",
                "IPv6"
              ],
              "description": "['IPv4', 'IPv6'] IPv4: Internet Protocol version 4; IPv6: Internet Protocol version 6.  If not specified, the protocol family will be automatically determined from the address."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "verifyHostname": {
              "default": true,
              "type": "boolean",
              "description": "yes: Ensures that when initiating a connection (as a client) the host name in the URL to which this connector connects to matches the host name in the digital certificate that the peer sends back as part of the SSL connection; no: Does not perform host name verification"
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "maxFrameSize": {
              "default": 16384,
              "type": "integer",
              "description": "The maximum frame size in octets that will be used in the connection-open negotiation with a connected peer.  The frame size is the largest contiguous set of uninterrupted data that can be sent for a message delivery over the connection. Interleaving of messages on different links is done at frame granularity. Policy settings will not overwrite this value. Defaults to 16384."
            },
            "sslProfile": {
              "type": "string",
              "description": "Name of the sslProfile."
            },
            "failoverUrls": {
              "type": "string",
              "description": "A read-only, comma-separated list of failover urls. "
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.connector",
          "description": "Establishes an outgoing connection from the router."
        },
        "logStats": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "debugCount": {
              "graph": true,
              "type": "integer",
              "description": "How many debug-level events have happened on this log."
            },
            "criticalCount": {
              "graph": true,
              "type": "integer",
              "description": "How many critical-level events have happened on this log."
            },
            "traceCount": {
              "graph": true,
              "type": "integer",
              "description": "How many trace-level events have happened on this log."
            },
            "warningCount": {
              "graph": true,
              "type": "integer",
              "description": "How many warning-level events have happened on this log."
            },
            "infoCount": {
              "graph": true,
              "type": "integer",
              "description": "How many info-level events have happened on this log."
            },
            "noticeCount": {
              "graph": true,
              "type": "integer",
              "description": "How many notice-level events have happened on this log."
            },
            "errorCount": {
              "graph": true,
              "type": "integer",
              "description": "How many error-level events have happened on this log."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.logStats",
          "description": "histogram of the different severity-levels of events on the given log."
        },
        "configurationEntity": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.configurationEntity",
          "description": "Base type for entities containing configuration information."
        },
        "exchange": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "divertedCount": {
              "type": "integer",
              "description": "A count of those deliveries that were forwarded via the alternateAddress only.  This is a subset of the forwardedCount."
            },
            "alternatePhase": {
              "type": "integer",
              "description": "The address phase for the alternateAddress.  Defaults to '0'."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "matchMethod": {
              "default": "amqp",
              "type": [
                "amqp",
                "mqtt"
              ],
              "description": "Key matching algorithm used. 'amqp' uses the legacy AMQP topic exchange wildcard match method as described in the pre-1.0 drafts. 'mqtt' uses the MQTT topic filter wildcard match method."
            },
            "forwardedCount": {
              "type": "integer",
              "description": "The total number of deliveries forwarded via matched bindings or to the alternateAddress"
            },
            "receivedCount": {
              "type": "integer",
              "description": "The total number of deliveries received by this exchange."
            },
            "bindingCount": {
              "type": "integer",
              "description": "The number of bindings associated with this exchange."
            },
            "address": {
              "required": true,
              "type": "string",
              "description": "The address of the exchange. Used by the message publisher as the target for sending messages."
            },
            "phase": {
              "type": "integer",
              "description": "The address phase for the exchange.  Defaults to '0'."
            },
            "alternateAddress": {
              "type": "string",
              "description": "The address to forward the message to if no bindings are matched."
            },
            "droppedCount": {
              "type": "integer",
              "description": "The total number of deliveries dropped due to the lack of an outgoing subscription."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.config.exchange",
          "description": "[EXPERIMENTAL] Defines a topic exchange."
        },
        "listener": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "stripAnnotations": {
              "default": "both",
              "type": [
                "in",
                "out",
                "both",
                "no"
              ],
              "description": "['in', 'out', 'both', 'no'] in: Strip the dispatch router specific annotations only on ingress; out: Strip the dispatch router specific annotations only on egress; both: Strip the dispatch router specific annotations on both ingress and egress; no - do not strip dispatch router specific annotations"
            },
            "requireSsl": {
              "type": "boolean",
              "description": "yes: Require the use of SSL or TLS on the connection; no: Allow clients to connect without SSL or TLS."
            },
            "idleTimeoutSeconds": {
              "default": 16,
              "type": "integer",
              "description": "The idle timeout, in seconds, for connections through this listener.  If no frames are received on the connection for this time interval, the connection shall be closed."
            },
            "maxSessionFrames": {
              "type": "integer",
              "description": "Session incoming window measured in transfer frames for sessions created on this connection. This is the number of transfer frames that may simultaneously be in flight for all links in the session. Setting this value to zero selects the default session window size. Policy settings, if specified, will overwrite this value. The numerical product of maxFrameSize and maxSessionFrames may not exceed 2^31-1. If (maxFrameSize x maxSessionFrames) exceeds 2^31-1 then maxSessionFrames is reduced to (2^31-1 / maxFrameSize). maxSessionFrames has a minimum value of 1. Defaults to 0 (unlimited window)."
            },
            "cost": {
              "default": 1,
              "type": "integer",
              "description": "For the 'inter-router' role only.  This value assigns a cost metric to the inter-router connection.  The default (and minimum) value is one.  Higher values represent higher costs.  The cost is used to influence the routing algorithm as it attempts to use the path with the lowest total cost from ingress to egress."
            },
            "port": {
              "default": "amqp",
              "type": "string",
              "description": "Port number or symbolic service name.  If '0', the router shall assign an ephemeral port to the listener and log the port number with a log of the form 'SERVER (notice) Listening on <host>:<assigned-port> (<listener-name>)'"
            },
            "saslPlugin": {
              "type": "string",
              "description": "EXPERIMENTAL. Name of the a sasl plugin configuration section to use for this listener (e.g. authServicePlugin)."
            },
            "linkCapacity": {
              "type": "integer",
              "description": "The capacity of links within this connection, in terms of message deliveries.  The capacity is the number of messages that can be in-flight concurrently for each link."
            },
            "policyVhost": {
              "type": "string",
              "description": "A listener may optionally define a virtual host to index to a specific policy to restrict the remote container to access only specific resources. This attribute defines the name of the policy vhost for this listener.  If multi-tenancy is enabled for the listener, this vhost will override the peer-supplied vhost for the purposes of identifying the desired policy settings for the connections."
            },
            "saslMechanisms": {
              "type": "string",
              "description": "Space separated list of accepted SASL authentication mechanisms."
            },
            "requireEncryption": {
              "type": "boolean",
              "description": "yes: Require the connection to the peer to be encrypted; no: Permit non-encrypted communication with the peer"
            },
            "trustedCertsFile": {
              "type": "path",
              "description": "This optional setting can be used to reduce the set of available CAs for client authentication.  If used, this setting must provide the absolute path to a PEM file that contains the trusted certificates."
            },
            "role": {
              "default": "normal",
              "type": [
                "normal",
                "inter-router",
                "route-container",
                "edge"
              ],
              "description": "The role of an established connection. In the normal role, the connection is assumed to be used for AMQP clients that are doing normal message delivery over the connection.  In the inter-router role, the connection is assumed to be to another router in the network.  Inter-router discovery and routing protocols can only be used over inter-router connections. route-container role can be used for router-container connections, for example, a router-broker connection.  In the edge role, the connection is assumed to be between an edge router and an interior router."
            },
            "websockets": {
              "default": true,
              "type": "boolean",
              "description": "For an http enabled listener, determines whether websockets access is enabled (true by default)."
            },
            "maxSessions": {
              "default": 32768,
              "type": "integer",
              "description": "The maximum number of sessions that can be simultaneously active on the connection. Setting this value to zero selects the default number of sessions. Policy settings, if specified, will overwrite this value. Defaults to 32768."
            },
            "authenticatePeer": {
              "type": "boolean",
              "description": "yes: Require the peer's identity to be authenticated; no: Do not require any authentication."
            },
            "http": {
              "type": "boolean",
              "description": "Accept HTTP connections that can upgrade to AMQP over WebSocket. Plain AMQP connections are not accepted on this listener."
            },
            "messageLoggingComponents": {
              "default": "none",
              "type": "string",
              "description": "A comma separated list that indicates which components of the message should be logged. Defaults to 'none' (log nothing). If you want all properties and application properties of the message logged use 'all'. Specific components of the message can be logged by indicating the components via a comma separated list. The components are message-id, user-id, to, subject, reply-to, correlation-id, content-type, content-encoding, absolute-expiry-time, creation-time, group-id, group-sequence, reply-to-group-id, app-properties. The application-data part of the bare message will not be logged. No spaces are allowed"
            },
            "multiTenant": {
              "type": "boolean",
              "description": "If true, apply multi-tenancy to endpoints connected at this listener.  The address space is defined by the virtual host (hostname field in the Open)."
            },
            "metrics": {
              "default": true,
              "type": "boolean",
              "description": "Export metrics in prometheus text format for the router (using path /metrics). Assumes listener is enabled for http."
            },
            "host": {
              "type": "string",
              "description": "A host name, IPV4 or IPV6 literal, or the empty string. The empty string listens on all local addresses. A host name listens on all addresses associated with the name. An IPV6 literal address (or wildcard '[::]') listens only for IPV6. An IPV4 literal address (or wildcard '0.0.0.0') listens only for IPV4."
            },
            "initialHandshakeTimeoutSeconds": {
              "type": "integer",
              "description": "The timeout, in seconds, for the initial handshake for connections coming in through listeners.  If the time interval expires before the peer sends the AMQP OPEN frame, the connection shall be closed.  A value of zero (the default) disables this timeout."
            },
            "httpRootDir": {
              "type": "path",
              "description": "Absolute path to a directory from which to serve static HTML files. For example, /usr/share/qpid-dispatch/console."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "socketAddressFamily": {
              "type": [
                "IPv4",
                "IPv6"
              ],
              "description": "['IPv4', 'IPv6'] IPv4: Internet Protocol version 4; IPv6: Internet Protocol version 6.  If not specified, the protocol family will be automatically determined from the address."
            },
            "healthz": {
              "default": true,
              "type": "boolean",
              "description": "Provide a simple HTTP based liveness test (using path /healthz). Assumes listener is enabled for http."
            },
            "maxFrameSize": {
              "default": 16384,
              "type": "integer",
              "description": "The maximum frame size in octets that will be used in the connection-open negotiation with a connected peer.  The frame size is the largest contiguous set of uninterrupted data that can be sent for a message delivery over the connection. Interleaving of messages on different links is done at frame granularity. Policy settings, if specified, will overwrite this value. Defaults to 16384."
            },
            "sslProfile": {
              "type": "string",
              "description": "Name of the sslProfile."
            },
            "failoverUrls": {
              "type": "string",
              "description": "A comma-separated list of failover urls to be supplied to connected clients.  Form: [(amqp|amqps|ws|wss)://]host_or_ip[:port]"
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.listener",
          "description": "Listens for incoming connections to the router."
        },
        "policy": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "enableVhostNamePatterns": {
              "type": "boolean",
              "description": "Enable vhost name patterns. When false vhost hostnames are treated as literal strings. When true vhost hostnames are treated as match patterns."
            },
            "connectionsProcessed": {
              "graph": true,
              "type": "integer"
            },
            "policyDir": {
              "type": "path",
              "description": "The absolute path to a directory that holds vhost policy definition files in JSON format (*.json). The router processes all of the vhost policies in each JSON file that is in this directory."
            },
            "defaultVhost": {
              "default": "$default",
              "type": "string",
              "description": "The name of the default vhost policy. This policy rule set is applied to a connection for which a vhost policy has not otherwise been configured. Processing for the default vhost is enabled by default and set to select vhost '$default'. To disable default vhost processing set defaultVhost to blank or do not define a vhost named '$default'."
            },
            "connectionsDenied": {
              "graph": true,
              "type": "integer"
            },
            "enableVhostPolicy": {
              "type": "boolean",
              "description": "Enables the router to enforce the connection denials and resource limits defined in the configured vhost policies."
            },
            "maxConnections": {
              "default": 65535,
              "type": "integer",
              "description": "The maximum number of concurrent client connections allowed for this router. This limit is always enforced, even if no other policy settings have been defined. The limit is applied to all incoming connections regardless of remote host, authenticated user, or targeted vhost."
            },
            "connectionsCurrent": {
              "graph": true,
              "type": "integer"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "singleton": true,
          "fullyQualifiedType": "org.apache.qpid.dispatch.policy",
          "description": "Defines global connection limit"
        },
        "address": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "egressPhase": {
              "type": "integer",
              "description": "Advanced - Override the egress phase for this address"
            },
            "pattern": {
              "type": "string",
              "description": "A wildcarded pattern for address matching. Incoming addresses are matched against this pattern. Matching addresses use the configured settings. The pattern consists of one or more tokens separated by a forward slash '/'. A token can be one of the following: a * character, a # character, or a sequence of characters that do not include /, *, or #.  The * token matches any single token.  The # token matches zero or more tokens. * has higher precedence than #, and exact match has the highest precedence. Cannot be used with a prefix attribute."
            },
            "ingressPhase": {
              "type": "integer",
              "description": "Advanced - Override the ingress phase for this address"
            },
            "priority": {
              "type": "integer",
              "description": "All messages sent to this address which lack an intrinsic priority will be assigned this priority."
            },
            "enableFallback": {
              "type": "boolean",
              "description": "If false, undeliverable messages are released.  If true, undeliverable messages shall be re-delivered to a fallback destination.  The fallback destination uses the same address, but is attached using an autoLink with 'fallback' enabled or a link with the qd.fallback capability."
            },
            "prefix": {
              "type": "string",
              "description": "The address prefix for the configured settings. Cannot be used with a pattern attribute."
            },
            "waypoint": {
              "type": "boolean",
              "description": "Designates this address space as being used for waypoints.  This will cause the proper address-phasing to be used."
            },
            "distribution": {
              "default": "balanced",
              "type": [
                "multicast",
                "closest",
                "balanced",
                "unavailable"
              ],
              "description": "Treatment of traffic associated with the address"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.config.address",
          "description": "Entity type for address configuration.  This is used to configure the treatment of message-routed deliveries within a particular address-space.  The configuration controls distribution and address phasing."
        },
        "authServicePlugin": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "realm": {
              "type": "string",
              "description": "Value to set for hostname field on sasl-init"
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "host": {
              "type": "string",
              "description": "A host name, IPV4 or IPV6 literal, of the service to delegate to."
            },
            "sslProfile": {
              "type": "string",
              "description": "Name of the sslProfile to use for the authentication service."
            },
            "port": {
              "default": "amqp",
              "type": "string",
              "description": "Port number of the service delegated host."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.authServicePlugin",
          "description": "EXPERIMENTAL. Attributes for setting SASL plugin."
        },
        "router.node": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "routerLink": {
              "type": "entityId",
              "description": "Local link to remote node"
            },
            "nextHop": {
              "type": "string",
              "description": "Neighbour ID of next hop to remote node from here."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "index": {
              "type": "integer",
              "description": "Index number used in statistics histograms for this router node.  This index is specific to this router."
            },
            "validOrigins": {
              "type": "list",
              "description": "List of valid origin nodes for messages arriving via the re mote node, used for duplicate elimination in redundant networks."
            },
            "linkState": {
              "type": "list",
              "description": "List of remote node's neighbours."
            },
            "instance": {
              "type": "integer",
              "description": "Remote node boot number."
            },
            "cost": {
              "type": "integer",
              "description": "Reachability cost"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "protocolVersion": {
              "type": "integer",
              "description": "Router-protocol version supported by the node."
            },
            "lastTopoChange": {
              "type": "integer",
              "description": "Timestamp showing the most recent change to this node's neighborhood."
            },
            "id": {
              "type": "string",
              "description": "Remote node identifier."
            },
            "address": {
              "type": "string",
              "description": "Address of the remote node"
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.node",
          "description": "Remote router node connected to this router."
        },
        "autoLink": {
          "operations": [
            "CREATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "operStatus": {
              "type": [
                "inactive",
                "attaching",
                "failed",
                "active",
                "quiescing",
                "idle"
              ],
              "description": "The operational status of this autoLink: inactive - The remote container is not connected; attaching - the link is attaching to the remote node; failed - the link attach failed; active - the link is attached and operational; quiescing - the link is transitioning to idle state; idle - the link is attached but there are no deliveries flowing and no unsettled deliveries."
            },
            "direction": {
              "required": true,
              "type": [
                "in",
                "out"
              ],
              "description": "The direction of the link to be created.  In means into the router, out means out of the router."
            },
            "containerId": {
              "type": "string",
              "description": "ContainerID for the target container. Only one of containerId or connection should be specified for an autoLink. Specifying both will result in the autoLink not being created"
            },
            "linkRef": {
              "type": "string",
              "description": "Reference to the org.apache.qpid.dispatch.router.link if the link exists"
            },
            "externalAddress": {
              "type": "string",
              "description": "If present, an alternate address of the node on the remote container.  This is used if the node has a different address than the address used internally by the router to route deliveries."
            },
            "connection": {
              "type": "string",
              "description": "The name from a connector or listener. Only one of containerId or connection should be specified for an autoLink. Specifying both will result in the autoLink not being created"
            },
            "address": {
              "required": true,
              "type": "string",
              "description": "The address of the provisioned object"
            },
            "phase": {
              "type": "integer",
              "description": "The address phase for this link.  Defaults to '0' for 'out' links and '1' for 'in' links."
            },
            "fallback": {
              "type": "boolean",
              "description": "If true, this auto-link is attached to a fallback destination for an address."
            },
            "lastError": {
              "type": "string",
              "description": "The error description from the last attach failure"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.config.autoLink",
          "description": "Entity type for configuring auto-links.  Auto-links are links whose lifecycle is managed by the router.  These are typically used to attach to waypoints on remote containers (brokers, etc.)."
        },
        "router.address": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "subscriberCount": {
              "graph": true,
              "type": "integer",
              "description": "The number of local subscribers for this address (i.e. attached to this router)"
            },
            "deliveriesEgress": {
              "graph": true,
              "type": "integer",
              "description": "The number of deliveries to this address that exited the router network on this router"
            },
            "deliveriesEgressRouteContainer": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were sent to a route-container address."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "deliveriesIngress": {
              "graph": true,
              "type": "integer",
              "description": "The number of deliveries to this address that entered the router network on this router"
            },
            "transitOutstanding": {
              "type": "list",
              "description": "List of numbers of outstanding deliveries across a transit (inter-router) link for this address.  This is for balanced distribution only."
            },
            "deliveriesIngressRouteContainer": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were received from a route-container address."
            },
            "priority": {
              "type": "integer",
              "description": "The message priority being handled by this address."
            },
            "remoteCount": {
              "graph": true,
              "type": "integer",
              "description": "The number of remote routers that have at least one subscriber to this address"
            },
            "inProcess": {
              "type": "integer",
              "description": "The number of in-process subscribers for this address"
            },
            "deliveriesFromContainer": {
              "graph": true,
              "type": "integer",
              "description": "The number of deliveries to this address that were originated from an in-process entity"
            },
            "deliveriesTransit": {
              "graph": true,
              "type": "integer",
              "description": "The number of deliveries to this address that transited this router to another router"
            },
            "containerCount": {
              "graph": true,
              "type": "integer",
              "description": "The number of attached containers that serve this route address"
            },
            "key": {
              "type": "string",
              "description": "Internal unique (to this router) key to identify the address"
            },
            "deliveriesRedirectedToFallback": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were sent to the fallback destination due to the primary destination being unreachable."
            },
            "distribution": {
              "type": [
                "flood",
                "multicast",
                "closest",
                "balanced",
                "linkBalanced",
                "unavailable"
              ],
              "description": "Forwarding treatment for the address: flood - messages delivered to all subscribers along all available paths (this will cause duplicate deliveries if there are redundant paths); multicast - one copy of each message delivered to all subscribers; closest - messages delivered to only the closest subscriber; balanced - messages delivered to one subscriber with load balanced across subscribers; linkBalanced - for link-routing, link attaches balanced across destinations; unavailable - this address is unavailable, link attaches to an address of unavailable distribution will be rejected."
            },
            "trackedDeliveries": {
              "type": "integer",
              "description": "Number of transit deliveries being tracked for this address (for balanced distribution)."
            },
            "deliveriesToContainer": {
              "graph": true,
              "type": "integer",
              "description": "The number of deliveries to this address that were given to an in-process subscriber"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "remoteHostRouters": {
              "type": "list",
              "description": "List of remote routers on which there is a destination for this address."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.address",
          "description": "AMQP address managed by the router."
        },
        "router.link": {
          "operations": [
            "UPDATE",
            "READ"
          ],
          "attributes": {
            "adminStatus": {
              "default": "enabled",
              "type": [
                "enabled",
                "disabled"
              ]
            },
            "linkType": {
              "type": [
                "endpoint",
                "router-control",
                "inter-router"
              ],
              "description": "Type of link: endpoint: a link to a normally connected endpoint; inter-router: a link to another router in the network."
            },
            "unsettledCount": {
              "graph": true,
              "type": "integer",
              "description": "The number of unsettled deliveries awaiting settlement on the link"
            },
            "ingressHistogram": {
              "type": "list",
              "description": "For outgoing links on connections with 'normal' role.  This histogram shows the number of settled deliveries on the link that ingressed the network at each interior router node."
            },
            "undeliveredCount": {
              "graph": true,
              "type": "integer",
              "description": "The number of undelivered messages pending for the link."
            },
            "acceptedCount": {
              "graph": true,
              "type": "integer",
              "description": "The total number of accepted deliveries."
            },
            "releasedCount": {
              "graph": true,
              "type": "integer",
              "description": "The total number of released deliveries."
            },
            "capacity": {
              "type": "integer",
              "description": "The capacity, in deliveries, for the link.  The number of undelivered plus unsettled deliveries shall not exceed the capacity.  This is enforced by link flow control."
            },
            "presettledCount": {
              "graph": true,
              "type": "integer",
              "description": "The total number of pre-settled deliveries."
            },
            "deliveriesDelayed1Sec": {
              "graph": true,
              "type": "integer",
              "description": "The total number of settled deliveries that were held in the router for 1 to 10 seconds."
            },
            "priority": {
              "type": "integer",
              "description": "For inter-router links, this is the message priority being handled."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "deliveriesDelayed10Sec": {
              "graph": true,
              "type": "integer",
              "description": "The total number of settled deliveries that were held in the router for more than 10 seconds."
            },
            "settleRate": {
              "graph": true,
              "type": "integer",
              "description": "The average rate (over five seconds) of settlement in deliveries-per-second.  This is included for egress links only."
            },
            "droppedPresettledCount": {
              "graph": true,
              "type": "integer",
              "description": "The total number of pre-settled deliveries that were dropped."
            },
            "peer": {
              "type": "string",
              "description": "Identifier of the paired link if this is an attach-routed link."
            },
            "linkName": {
              "type": "string",
              "description": "Name assigned to the link in the Attach."
            },
            "rejectedCount": {
              "graph": true,
              "type": "integer",
              "description": "The total number of rejected deliveries."
            },
            "deliveryCount": {
              "graph": true,
              "type": "integer",
              "description": "The total number of deliveries that have traversed this link."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "operStatus": {
              "type": [
                "up",
                "down",
                "quiescing",
                "idle"
              ]
            },
            "linkDir": {
              "type": [
                "in",
                "out"
              ],
              "description": "Direction of delivery flow over the link, inbound or outbound to or from the router."
            },
            "modifiedCount": {
              "graph": true,
              "type": "integer",
              "description": "The total number of modified deliveries."
            },
            "owningAddr": {
              "type": "string",
              "description": "Address assigned to this link during attach: The target for inbound links or the source for outbound links."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.router.link",
          "description": "Link to another AMQP endpoint: router node, client or other AMQP process."
        },
        "org.amqp.management": {
          "operations": [
            "QUERY",
            "GET-TYPES",
            "GET-ANNOTATIONS",
            "GET-OPERATIONS",
            "GET-ATTRIBUTES",
            "GET-MGMT-NODES",
            "READ"
          ],
          "attributes": {
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.org.amqp.management",
          "description": "The standard AMQP management node interface."
        },
        "operationalEntity": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.operationalEntity",
          "description": "Base type for entities containing current operational information."
        },
        "connection": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "adminStatus": {
              "default": "enabled",
              "type": [
                "enabled",
                "deleted"
              ],
              "description": "This field is set to enabled when the connection is up and running. Setting this field to deleted will terminate the connection and all links and sessions contained in the connection. Inter-router connections cannot be terminated by setting the adminStatus to deleted."
            },
            "container": {
              "type": "string",
              "description": "The container for this connection"
            },
            "opened": {
              "type": "boolean",
              "description": "The connection has been opened (i.e. AMQP OPEN)"
            },
            "sslCipher": {
              "type": "string",
              "description": "SSL cipher name"
            },
            "operStatus": {
              "type": [
                "up",
                "closing"
              ]
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "sslProto": {
              "type": "string",
              "description": "SSL protocol name"
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "properties": {
              "type": "map",
              "description": "Connection properties supplied by the peer."
            },
            "ssl": {
              "type": "boolean",
              "description": "True iff SSL/TLS is in effect for this connection."
            },
            "host": {
              "type": "string",
              "description": "IP address and port number in the form addr:port."
            },
            "isEncrypted": {
              "type": "boolean",
              "description": "Indicates whether the connection content is encrypted."
            },
            "role": {
              "type": "string"
            },
            "isAuthenticated": {
              "type": "boolean",
              "description": "Indicates whether the identity of the connection's user is authentic."
            },
            "tenant": {
              "type": "string",
              "description": "If multi-tenancy is on for this connection, the tenant space in effect"
            },
            "sasl": {
              "type": "string",
              "description": "SASL mechanism in effect for authentication."
            },
            "sslSsf": {
              "type": "integer",
              "description": "SSL strength factor in effect"
            },
            "dir": {
              "type": [
                "in",
                "out"
              ],
              "description": "Direction of connection establishment in or out of the router."
            },
            "user": {
              "type": "string",
              "description": "Identity of the authenticated user."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.connection",
          "description": "Connections to the router's container."
        },
        "router": {
          "operations": [
            "READ"
          ],
          "attributes": {
            "workerThreads": {
              "default": 4,
              "type": "integer",
              "description": "The number of threads that will be created to process message traffic and other application work (timers, non-amqp file descriptors, etc.) ."
            },
            "raIntervalSeconds": {
              "default": 30,
              "type": "integer",
              "description": "Interval in seconds between Router-Advertisements sent to all routers in a stable network."
            },
            "raIntervalFluxSeconds": {
              "default": 4,
              "type": "integer",
              "description": "Interval in seconds between Router-Advertisements sent to all routers during topology fluctuations."
            },
            "linkRouteCount": {
              "graph": true,
              "type": "integer",
              "description": "Number of link routes attached to the router node."
            },
            "allowResumableLinkRoute": {
              "default": true,
              "type": "boolean",
              "description": "Whether links can be routed where timeout is non-zero or expiry-policy is not link-detach"
            },
            "rejectedDeliveries": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries whose delivery state was set to REJECTED by the router. These deliveries were Invalid and unprocessable."
            },
            "autoLinkCount": {
              "graph": true,
              "type": "integer",
              "description": "Number of auto links attached to the router node."
            },
            "saslConfigName": {
              "default": "qdrouterd",
              "type": "string",
              "description": "Name of the SASL configuration.  This string + '.conf' is the name of the configuration file."
            },
            "id": {
              "type": "string",
              "description": "Router's unique identity. If not specified, a random identity will be assigned at startup."
            },
            "presettledDeliveries": {
              "graph": true,
              "type": "integer",
              "description": "Number of presettled deliveries handled by the router."
            },
            "deliveriesTransit": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were sent to another router in the network."
            },
            "area": {
              "type": "string",
              "description": "Unused placeholder."
            },
            "deliveriesIngress": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were sent to it by a sender that is directly attached to the router."
            },
            "deliveriesIngressRouteContainer": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were received from router container connections."
            },
            "droppedPresettledDeliveries": {
              "graph": true,
              "type": "integer",
              "description": "Number of presettled deliveries that were dropped by the router."
            },
            "acceptedDeliveries": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries whose delivery state was set to ACCEPTED by the router. These deliveries were successfully processed by the router."
            },
            "helloIntervalSeconds": {
              "default": 1,
              "type": "integer",
              "description": "Interval in seconds between HELLO messages sent to neighbor routers."
            },
            "deliveriesDelayed1Sec": {
              "graph": true,
              "type": "integer",
              "description": "The total number of settled deliveries that were held in the router for 1 to 10 seconds."
            },
            "saslConfigDir": {
              "type": "path",
              "description": "Absolute path to the SASL configuration file."
            },
            "version": {
              "type": "string",
              "description": "Software Version"
            },
            "remoteLsMaxAgeSeconds": {
              "default": 60,
              "type": "integer",
              "description": "Time in seconds after which link state is declared stale if no RA is received."
            },
            "deliveriesDelayed10Sec": {
              "graph": true,
              "type": "integer",
              "description": "The total number of settled deliveries that were held in the router for more than 10 seconds."
            },
            "linkCount": {
              "graph": true,
              "type": "integer",
              "description": "Number of links attached to the router node."
            },
            "debugDumpFile": {
              "type": "path",
              "description": "The absolute path to the location for the debug dump file. The router writes debug-level information to this file if the logger is not available."
            },
            "connectionCount": {
              "graph": true,
              "type": "integer",
              "description": "Number of open connections to the router node."
            },
            "hostName": {
              "type": "string",
              "description": "hostName of machine on which router is running"
            },
            "addrCount": {
              "graph": true,
              "type": "integer",
              "description": "Number of addresses known to the router."
            },
            "deliveriesEgressRouteContainer": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were sent to route container connections."
            },
            "nodeCount": {
              "graph": true,
              "type": "integer",
              "description": "Number of known peer router nodes."
            },
            "modifiedDeliveries": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries whose delivery state was set to MODIFIED by the router. These deliveries were modified but not processed."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "deliveriesEgress": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were sent by the router to a receiver that is directly attached to the router."
            },
            "releasedDeliveries": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries whose delivery state was set to RELEASED by the router. These deliveries was not (and will not be) processed"
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            },
            "timestampsInUTC": {
              "type": "boolean",
              "description": "Use UTC time rather than localtime in logs."
            },
            "timestampFormat": {
              "type": "string",
              "description": "Format string to use for timestamps in logs."
            },
            "helloMaxAgeSeconds": {
              "default": 3,
              "type": "integer",
              "description": "Time in seconds after which a neighbor is declared lost if no HELLO is received."
            },
            "defaultDistribution": {
              "default": "balanced",
              "type": [
                "multicast",
                "closest",
                "balanced",
                "unavailable"
              ],
              "description": "Default forwarding treatment for any address without a specified treatment. multicast - one copy of each message delivered to all subscribers; closest - messages delivered to only the closest subscriber; balanced - messages delivered to one subscriber with load balanced across subscribers; unavailable - this address is unavailable, link attaches to an address of unavilable distribution will be rejected."
            },
            "mode": {
              "default": "standalone",
              "type": [
                "standalone",
                "interior",
                "edge"
              ],
              "description": "In standalone mode, the router operates as a single component.  It does not participate in the routing protocol and therefore will not cooperate with other routers. In interior mode, the router operates in cooperation with other interior routers in an interconnected network.  In edge mode, the router can make a connection to an interior router and join a network without causing that network to recompute paths."
            },
            "deliveriesRedirectedToFallback": {
              "graph": true,
              "type": "integer",
              "description": "Number of deliveries that were sent to the fallback destination due to the primary destination being unreachable."
            },
            "allowUnsettledMulticast": {
              "type": "boolean",
              "description": "(DEPRECATED) If true, allow senders to send unsettled deliveries to multicast addresses.  These deliveries shall be settled by the ingress router.  If false, unsettled deliveries to multicast addresses shall be rejected."
            }
          },
          "singleton": true,
          "fullyQualifiedType": "org.apache.qpid.dispatch.router",
          "description": "Tracks peer routers and computes routes to destinations. This entity is mandatory. The router will not start without this entity."
        },
        "vhost": {
          "operations": [
            "CREATE",
            "UPDATE",
            "DELETE",
            "READ"
          ],
          "attributes": {
            "allowUnknownUser": {
              "type": "boolean",
              "description": "Whether unknown users (users who are not members of a defined user group) are allowed to connect to the vhost. Unknown users are assigned to the '$default' user group and receive '$default' settings."
            },
            "maxConnectionsPerUser": {
              "default": 65535,
              "type": "integer",
              "description": "The maximum number of concurrent client connections allowed for any user."
            },
            "hostname": {
              "required": true,
              "type": "string",
              "description": "The hostname of the vhost. This vhost policy will be applied to any client connection that is directed to this hostname."
            },
            "groups": {
              "type": "map",
              "description": "A map where each key is a vhost name and each value is a map of the settings for users of that vhost."
            },
            "maxConnections": {
              "default": 65535,
              "type": "integer",
              "description": "The global maximum number of concurrent client connections allowed for this vhost."
            },
            "maxConnectionsPerHost": {
              "default": 65535,
              "type": "integer",
              "description": "The maximum number of concurrent client connections allowed for any remote host (the host from which the client is connecting)."
            },
            "identity": {
              "unique": true,
              "type": "string",
              "description": "Unique identity generated by the system. Will not change."
            },
            "name": {
              "unique": true,
              "type": "string",
              "description": "Unique name optionally assigned by user. Can be changed."
            }
          },
          "fullyQualifiedType": "org.apache.qpid.dispatch.vhost",
          "description": "AMQP virtual host policy definition of users, user groups, allowed remote hosts, and AMQP restrictions."
        }
      }
    },
    setHooks: () => { }
  }
}
