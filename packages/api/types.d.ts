export type SarifVersion = '2.1.0'

export interface SarifLog {
  $schema?: string
  version: SarifVersion
  runs: Run[]
  inlineExternalProperties?: ExternalProperties[]
  properties?: PropertyBag
}

export interface PropertyBag {
  tags?: string[]
  [key: string]: unknown
}

export interface Message {
  text?: string
  markdown?: string
  id?: string
  arguments?: string[]
  properties?: PropertyBag
}

export interface MultiformatMessageString {
  text: string
  markdown?: string
  properties?: PropertyBag
}

export interface Address {
  absoluteAddress?: number
  relativeAddress?: number
  length?: number
  kind?: string
  name?: string
  fullyQualifiedName?: string
  offsetFromParent?: number
  index?: number
  parentIndex?: number
  properties?: PropertyBag
}

export interface ArtifactLocation {
  uri?: string
  uriBaseId?: string
  index?: number
  description?: Message
  properties?: PropertyBag
}

export interface ArtifactContent {
  text?: string
  binary?: string
  rendered?: MultiformatMessageString
  properties?: PropertyBag
}

export interface Artifact {
  description?: Message
  location?: ArtifactLocation
  parentIndex?: number
  offset?: number
  length?: number
  roles?: ArtifactRole[]
  mimeType?: string
  contents?: ArtifactContent
  encoding?: string
  sourceLanguage?: string
  hashes?: Record<string, string>
  lastModifiedTimeUtc?: string
  properties?: PropertyBag
}

export type ArtifactRole =
  | 'analysisTarget'
  | 'attachment'
  | 'responseFile'
  | 'resultFile'
  | 'standardStream'
  | 'tracedFile'
  | 'unmodified'
  | 'modified'
  | 'added'
  | 'deleted'
  | 'renamed'
  | 'uncontrolled'
  | 'driver'
  | 'extension'
  | 'translation'
  | 'taxonomy'
  | 'policy'
  | 'referencedOnCommandLine'
  | 'memoryContents'
  | 'directory'
  | 'userSpecifiedConfiguration'
  | 'toolSpecifiedConfiguration'
  | 'debugOutputFile'

export interface Region {
  startLine?: number
  startColumn?: number
  endLine?: number
  endColumn?: number
  charOffset?: number
  charLength?: number
  byteOffset?: number
  byteLength?: number
  snippet?: ArtifactContent
  message?: Message
  sourceLanguage?: string
  properties?: PropertyBag
}

export interface PhysicalLocation {
  address?: Address
  artifactLocation?: ArtifactLocation
  region?: Region
  contextRegion?: Region
  properties?: PropertyBag
}

export interface LogicalLocation {
  name?: string
  index?: number
  fullyQualifiedName?: string
  decoratedName?: string
  parentIndex?: number
  kind?: string
  properties?: PropertyBag
}

export interface Location {
  id?: number
  physicalLocation?: PhysicalLocation
  logicalLocations?: LogicalLocation[]
  message?: Message
  annotations?: Region[]
  relationships?: LocationRelationship[]
  properties?: PropertyBag
}

export interface LocationRelationship {
  target: number
  kinds?: string[]
  description?: Message
  properties?: PropertyBag
}

export interface Rectangle {
  top?: number
  left?: number
  bottom?: number
  right?: number
  message?: Message
  properties?: PropertyBag
}

export interface Attachment {
  description?: Message
  artifactLocation: ArtifactLocation
  regions?: Region[]
  rectangles?: Rectangle[]
  properties?: PropertyBag
}

export interface Replacement {
  deletedRegion: Region
  insertedContent?: ArtifactContent
  properties?: PropertyBag
}

export interface ArtifactChange {
  artifactLocation: ArtifactLocation
  replacements: Replacement[]
  properties?: PropertyBag
}

export interface Fix {
  description?: Message
  artifactChanges: ArtifactChange[]
  properties?: PropertyBag
}

export interface Edge {
  id: string
  label?: Message
  sourceNodeId: string
  targetNodeId: string
  properties?: PropertyBag
}

export interface EdgeTraversal {
  edgeId: string
  message?: Message
  finalState?: Record<string, MultiformatMessageString>
  stepOverEdgeCount?: number
  properties?: PropertyBag
}

export interface Node {
  id: string
  label?: Message
  location?: Location
  children?: Node[]
  properties?: PropertyBag
}

export interface Graph {
  description?: Message
  nodes?: Node[]
  edges?: Edge[]
  properties?: PropertyBag
}

export interface GraphTraversal {
  runGraphIndex?: number
  resultGraphIndex?: number
  description?: Message
  initialState?: Record<string, MultiformatMessageString>
  immutableState?: Record<string, MultiformatMessageString>
  edgeTraversals?: EdgeTraversal[]
  properties?: PropertyBag
}

export interface StackFrame {
  location?: Location
  module?: string
  threadId?: number
  parameters?: string[]
  properties?: PropertyBag
}

export interface Stack {
  message?: Message
  frames: StackFrame[]
  properties?: PropertyBag
}

export interface ThreadFlowLocation {
  index?: number
  location?: Location
  stack?: Stack
  kinds?: string[]
  taxa?: ReportingDescriptorReference[]
  module?: string
  state?: Record<string, MultiformatMessageString>
  nestingLevel?: number
  executionOrder?: number
  executionTimeUtc?: string
  importance?: 'important' | 'essential' | 'unimportant'
  webRequest?: WebRequest
  webResponse?: WebResponse
  properties?: PropertyBag
}

export interface ThreadFlow {
  id?: string
  message?: Message
  initialState?: Record<string, MultiformatMessageString>
  immutableState?: Record<string, MultiformatMessageString>
  locations: ThreadFlowLocation[]
  properties?: PropertyBag
}

export interface CodeFlow {
  message?: Message
  threadFlows: ThreadFlow[]
  properties?: PropertyBag
}

export interface Exception {
  kind?: string
  message?: string
  stack?: Stack
  innerExceptions?: Exception[]
  properties?: PropertyBag
}

export interface ReportingConfiguration {
  enabled?: boolean
  level?: NotificationLevel
  rank?: number
  parameters?: PropertyBag
  properties?: PropertyBag
}

export interface ReportingDescriptor {
  id: string
  deprecatedIds?: string[]
  guid?: string
  deprecatedGuids?: string[]
  name?: string
  deprecatedNames?: string[]
  shortDescription?: MultiformatMessageString
  fullDescription?: MultiformatMessageString
  messageStrings?: Record<string, MultiformatMessageString>
  defaultConfiguration?: ReportingConfiguration
  helpUri?: string
  help?: MultiformatMessageString
  relationships?: ReportingDescriptorRelationship[]
  properties?: PropertyBag
}

export interface ReportingDescriptorReference {
  id?: string
  index?: number
  guid?: string
  toolComponent?: ToolComponentReference
  properties?: PropertyBag
}

export interface ReportingDescriptorRelationship {
  target: ReportingDescriptorReference
  kinds?: string[]
  description?: Message
  properties?: PropertyBag
}

export interface Suppression {
  guid?: string
  kind: 'inSource' | 'external'
  state?: 'accepted' | 'underReview' | 'rejected'
  justification?: string
  location?: Location
  properties?: PropertyBag
}

export interface ResultProvenance {
  firstDetectionTimeUtc?: string
  lastDetectionTimeUtc?: string
  firstDetectionRunGuid?: string
  lastDetectionRunGuid?: string
  invocationIndex?: number
  conversionSources?: PhysicalLocation[]
  properties?: PropertyBag
}

export interface Result {
  ruleId?: string
  ruleIndex?: number
  rule?: ReportingDescriptorReference
  kind?: ResultKind
  level?: NotificationLevel
  message: Message
  analysisTarget?: ArtifactLocation
  locations?: Location[]
  guid?: string
  correlationGuid?: string
  occurrenceCount?: number
  partialFingerprints?: Record<string, string>
  fingerprints?: Record<string, string>
  stacks?: Stack[]
  codeFlows?: CodeFlow[]
  graphs?: Graph[]
  graphTraversals?: GraphTraversal[]
  relatedLocations?: Location[]
  suppressions?: Suppression[]
  baselineState?: 'new' | 'unchanged' | 'updated' | 'absent'
  rank?: number
  attachments?: Attachment[]
  hostedViewerUri?: string
  workItemUris?: string[]
  provenance?: ResultProvenance
  fixes?: Fix[]
  taxa?: ReportingDescriptorReference[]
  webRequest?: WebRequest
  webResponse?: WebResponse
  properties?: PropertyBag
}

export type ResultKind =
  | 'notApplicable'
  | 'pass'
  | 'fail'
  | 'review'
  | 'open'
  | 'informational'

export type NotificationLevel = 'none' | 'note' | 'warning' | 'error'

export interface WebRequest {
  index?: number
  protocol?: string
  version?: string
  target?: string
  method?: string
  headers?: Record<string, string>
  parameters?: Record<string, string>
  body?: ArtifactContent
  properties?: PropertyBag
}

export interface WebResponse {
  index?: number
  protocol?: string
  version?: string
  statusCode?: number
  reasonPhrase?: string
  headers?: Record<string, string>
  body?: ArtifactContent
  noResponseReceived?: boolean
  properties?: PropertyBag
}

export interface Notification {
  locations?: Location[]
  message: Message
  level?: NotificationLevel
  threadId?: number
  timeUtc?: string
  exception?: Exception
  descriptor?: ReportingDescriptorReference
  associatedRule?: ReportingDescriptorReference
  properties?: PropertyBag
}

export interface ConfigurationOverride {
  configuration: ReportingConfiguration
  descriptor: ReportingDescriptorReference
  properties?: PropertyBag
}

export interface Invocation {
  commandLine?: string
  arguments?: string[]
  responseFiles?: ArtifactLocation[]
  startTimeUtc?: string
  endTimeUtc?: string
  exitCode?: number
  ruleConfigurationOverrides?: ConfigurationOverride[]
  notificationConfigurationOverrides?: ConfigurationOverride[]
  toolExecutionNotifications?: Notification[]
  toolConfigurationNotifications?: Notification[]
  exitCodeDescription?: string
  exitSignalName?: string
  exitSignalNumber?: number
  processStartFailureMessage?: string
  executionSuccessful: boolean
  machine?: string
  account?: string
  processId?: number
  executableLocation?: ArtifactLocation
  workingDirectory?: ArtifactLocation
  environmentVariables?: Record<string, string>
  stdin?: ArtifactLocation
  stdout?: ArtifactLocation
  stderr?: ArtifactLocation
  stdoutStderr?: ArtifactLocation
  properties?: PropertyBag
}

export interface ToolComponentReference {
  name?: string
  index?: number
  guid?: string
  properties?: PropertyBag
}

export interface TranslationMetadata {
  name: string
  fullName?: string
  shortDescription?: MultiformatMessageString
  fullDescription?: MultiformatMessageString
  downloadUri?: string
  informationUri?: string
  properties?: PropertyBag
}

export interface ToolComponent {
  guid?: string
  name: string
  organization?: string
  product?: string
  productSuite?: string
  shortDescription?: MultiformatMessageString
  fullDescription?: MultiformatMessageString
  fullName?: string
  version?: string
  semanticVersion?: string
  dottedQuadFileVersion?: string
  releaseDateUtc?: string
  downloadUri?: string
  informationUri?: string
  globalMessageStrings?: Record<string, MultiformatMessageString>
  notifications?: ReportingDescriptor[]
  rules?: ReportingDescriptor[]
  taxa?: ReportingDescriptor[]
  locations?: ArtifactLocation[]
  language?: string
  contents?: ('localizedData' | 'nonLocalizedData')[]
  isComprehensive?: boolean
  localizedDataSemanticVersion?: string
  minimumRequiredLocalizedDataSemanticVersion?: string
  associatedComponent?: ToolComponentReference
  translationMetadata?: TranslationMetadata
  supportedTaxonomies?: ToolComponentReference[]
  properties?: PropertyBag
}

export interface Tool {
  driver: ToolComponent
  extensions?: ToolComponent[]
  properties?: PropertyBag
}

export interface Conversion {
  tool: Tool
  invocation?: Invocation
  analysisToolLogFiles?: ArtifactLocation[]
  properties?: PropertyBag
}

export interface VersionControlDetails {
  repositoryUri: string
  revisionId?: string
  branch?: string
  revisionTag?: string
  asOfTimeUtc?: string
  mappedTo?: ArtifactLocation
  properties?: PropertyBag
}

export interface RunAutomationDetails {
  description?: Message
  id?: string
  guid?: string
  correlationGuid?: string
  properties?: PropertyBag
}

export interface SpecialLocations {
  displayBase?: ArtifactLocation
  properties?: PropertyBag
}

export interface ExternalPropertyFileReference {
  location?: ArtifactLocation
  guid?: string
  itemCount?: number
  properties?: PropertyBag
}

export interface ExternalPropertyFileReferences {
  conversion?: ExternalPropertyFileReference
  graphs?: ExternalPropertyFileReference[]
  externalizedProperties?: ExternalPropertyFileReference
  artifacts?: ExternalPropertyFileReference[]
  invocations?: ExternalPropertyFileReference[]
  logicalLocations?: ExternalPropertyFileReference[]
  threadFlowLocations?: ExternalPropertyFileReference[]
  results?: ExternalPropertyFileReference[]
  taxonomies?: ExternalPropertyFileReference[]
  addresses?: ExternalPropertyFileReference[]
  driver?: ExternalPropertyFileReference
  extensions?: ExternalPropertyFileReference[]
  policies?: ExternalPropertyFileReference[]
  translations?: ExternalPropertyFileReference[]
  webRequests?: ExternalPropertyFileReference[]
  webResponses?: ExternalPropertyFileReference[]
  properties?: PropertyBag
}

export interface ExternalProperties {
  schema?: string
  version?: SarifVersion
  guid?: string
  runGuid?: string
  conversion?: Conversion
  graphs?: Graph[]
  externalizedProperties?: PropertyBag
  artifacts?: Artifact[]
  invocations?: Invocation[]
  logicalLocations?: LogicalLocation[]
  threadFlowLocations?: ThreadFlowLocation[]
  results?: Result[]
  taxonomies?: ToolComponent[]
  driver?: ToolComponent
  extensions?: ToolComponent[]
  policies?: ToolComponent[]
  translations?: ToolComponent[]
  addresses?: Address[]
  webRequests?: WebRequest[]
  webResponses?: WebResponse[]
  properties?: PropertyBag
}

export interface Run {
  tool: Tool
  invocations?: Invocation[]
  conversion?: Conversion
  language?: string
  versionControlProvenance?: VersionControlDetails[]
  originalUriBaseIds?: Record<string, ArtifactLocation>
  artifacts?: Artifact[]
  logicalLocations?: LogicalLocation[]
  graphs?: Graph[]
  results?: Result[]
  automationDetails?: RunAutomationDetails
  runAggregates?: RunAutomationDetails[]
  baselineGuid?: string
  redactionTokens?: string[]
  defaultEncoding?: string
  defaultSourceLanguage?: string
  newlineSequences?: string[]
  columnKind?: 'utf16CodeUnits' | 'unicodeCodePoints'
  externalPropertyFileReferences?: ExternalPropertyFileReferences
  threadFlowLocations?: ThreadFlowLocation[]
  taxonomies?: ToolComponent[]
  addresses?: Address[]
  translations?: ToolComponent[]
  policies?: ToolComponent[]
  webRequests?: WebRequest[]
  webResponses?: WebResponse[]
  specialLocations?: SpecialLocations
  properties?: PropertyBag
}

// ============================================================
// XCCDF 1.2 Types (derived from xccdf.xsd)
// ============================================================

/** XCCDF status values (statusType) */
export type XccdfStatusType =
  | 'accepted'
  | 'deprecated'
  | 'draft'
  | 'incomplete'
  | 'interim'

/** XCCDF severity values (severityEnumType) */
export type XccdfSeverityEnumType =
  | 'unknown'
  | 'info'
  | 'low'
  | 'medium'
  | 'high'

/** XCCDF role values (roleEnumType) */
export type XccdfRoleEnumType = 'full' | 'unscored' | 'unchecked'

/** XCCDF result values (resultEnumType) */
export type XccdfResultEnumType =
  | 'pass'
  | 'fail'
  | 'error'
  | 'unknown'
  | 'notapplicable'
  | 'notchecked'
  | 'notselected'
  | 'informational'
  | 'fixed'

/** XCCDF fix strategy values (fixStrategyEnumType) */
export type XccdfFixStrategyEnumType =
  | 'unknown'
  | 'configure'
  | 'combination'
  | 'disable'
  | 'enable'
  | 'patch'
  | 'policy'
  | 'restrict'
  | 'update'

/** XCCDF rating values for disruption/complexity (ratingEnumType) */
export type XccdfRatingEnumType = 'unknown' | 'low' | 'medium' | 'high'

/** XCCDF warning category values (warningCategoryEnumType) */
export type XccdfWarningCategoryEnumType =
  | 'general'
  | 'functionality'
  | 'performance'
  | 'hardware'
  | 'legal'
  | 'regulatory'
  | 'management'
  | 'audit'
  | 'dependency'

/** XCCDF complex-check operator values (ccOperatorEnumType) */
export type XccdfCcOperatorEnumType = 'OR' | 'AND'

/** XCCDF Value type values (valueTypeType) */
export type XccdfValueTypeType = 'number' | 'string' | 'boolean'

/** XCCDF Value operator values (valueOperatorType) */
export type XccdfValueOperatorType =
  | 'equals'
  | 'not equal'
  | 'greater than'
  | 'less than'
  | 'greater than or equal'
  | 'less than or equal'
  | 'pattern match'

/** XCCDF interface hint values (interfaceHintType) */
export type XccdfInterfaceHintType =
  | 'choice'
  | 'textline'
  | 'text'
  | 'date'
  | 'datetime'

/** XCCDF message severity values (msgSevEnumType) */
export type XccdfMsgSevEnumType = 'error' | 'warning' | 'info'

/** XCCDF sub @use attribute values (subUseEnumType) */
export type XccdfSubUseEnumType = 'value' | 'title' | 'legacy'

/** Text with optional @xml:lang and @override (textType) */
export interface XccdfTextType {
  value: string
  lang?: string
  override?: boolean
}

/** HTML text with optional XHTML content (htmlTextType) */
export interface XccdfHtmlTextType {
  value: string
  lang?: string
  override?: boolean
}

/** HTML text with <sub> substitution support (htmlTextWithSubType) */
export interface XccdfHtmlTextWithSubType {
  value: string
  lang?: string
  override?: boolean
  sub?: XccdfSubType[]
}

/** Text with <sub> substitution support (textWithSubType) */
export interface XccdfTextWithSubType {
  value: string
  lang?: string
  override?: boolean
  sub?: XccdfSubType[]
}

/** Sub element for text substitution (subType) */
export interface XccdfSubType {
  idref: string
  use?: XccdfSubUseEnumType
}

/** Status element (status) */
export interface XccdfStatus {
  status: XccdfStatusType
  date?: string
}

/** Dublin Core status (dc-statusType) */
export interface XccdfDcStatusType {
  [key: string]: unknown
}

/** Version element (versionType) */
export interface XccdfVersionType {
  value: string
  time?: string
  update?: string
}

/** Plain text block (plainTextType) */
export interface XccdfPlainTextType {
  id: string
  value: string
}

/** Reference element (referenceType) */
export interface XccdfReferenceType {
  value?: string
  href?: string
  override?: boolean
}

/** Signature element (signatureType) */
export interface XccdfSignatureType {
  [key: string]: unknown
}

/** Metadata element (metadataType) */
export interface XccdfMetadataType {
  [key: string]: unknown
}

/** Notice element (noticeType) */
export interface XccdfNoticeType {
  id?: string
  value?: string
  lang?: string
}

/** Param element for model (paramType) */
export interface XccdfParamType {
  name: string
  value: string
}

/** Model element */
export interface XccdfModel {
  system: string
  param?: XccdfParamType[]
}

/** CPE 2 idref type (CPE2idrefType) */
export interface XccdfCPE2IdrefType {
  idref: string
}

/** Overrideable CPE 2 idref type (overrideableCPE2idrefType) */
export interface XccdfOverrideableCPE2IdrefType extends XccdfCPE2IdrefType {
  override?: boolean
}

/** Idref type (idrefType) */
export interface XccdfIdrefType {
  idref: string
}

/** Idref list type (idrefListType) */
export interface XccdfIdrefListType {
  idref: string
}

/** Warning element (warningType) */
export interface XccdfWarningType extends XccdfHtmlTextWithSubType {
  category?: XccdfWarningCategoryEnumType
}

/** Profile note (profileNoteType) */
export interface XccdfProfileNoteType {
  value?: string
  lang?: string
  tag: string
  sub?: XccdfSubType[]
}

/** Ident element (identType) */
export interface XccdfIdentType {
  value: string
  system: string
}

/** Fix text element (fixTextType) */
export interface XccdfFixTextType extends XccdfHtmlTextWithSubType {
  fixref?: string
  reboot?: boolean
  strategy?: XccdfFixStrategyEnumType
  disruption?: XccdfRatingEnumType
  complexity?: XccdfRatingEnumType
}

/** Instance in fix element (instanceFixType) */
export interface XccdfInstanceFixType {
  context?: string
}

/** Fix element (fixType) */
export interface XccdfFixType {
  value?: string
  id?: string
  reboot?: boolean
  strategy?: XccdfFixStrategyEnumType
  disruption?: XccdfRatingEnumType
  complexity?: XccdfRatingEnumType
  system?: string
  platform?: string
  sub?: XccdfSubType[]
  instance?: XccdfInstanceFixType[]
}

/** Check import element (checkImportType) */
export interface XccdfCheckImportType {
  importName: string
  importXpath?: string
  value?: string
}

/** Check export element (checkExportType) */
export interface XccdfCheckExportType {
  valueId: string
  exportName: string
}

/** Check content ref element (checkContentRefType) */
export interface XccdfCheckContentRefType {
  href: string
  name?: string
}

/** Check content element (checkContentType) */
export interface XccdfCheckContentType {
  [key: string]: unknown
}

/** Check element (checkType) */
export interface XccdfCheckType {
  system: string
  negate?: boolean
  id?: string
  selector?: string
  multiCheck?: boolean
  checkImport?: XccdfCheckImportType[]
  checkExport?: XccdfCheckExportType[]
  checkContentRef?: XccdfCheckContentRefType[]
  checkContent?: XccdfCheckContentType
}

/** Complex check element (complexCheckType) */
export interface XccdfComplexCheckType {
  operator: XccdfCcOperatorEnumType
  negate?: boolean
  check?: XccdfCheckType[]
  complexCheck?: XccdfComplexCheckType[]
}

/** Base item type (itemType) - abstract */
export interface XccdfItemType {
  id: string
  abstract?: boolean
  clusterId?: string
  extends?: string
  hidden?: boolean
  prohibitChanges?: boolean
  lang?: string
  Id?: string
  status?: XccdfStatus[]
  dcStatus?: XccdfDcStatusType[]
  version?: XccdfVersionType
  title?: XccdfTextWithSubType[]
  description?: XccdfHtmlTextWithSubType[]
  warning?: XccdfWarningType[]
  question?: XccdfTextType[]
  reference?: XccdfReferenceType[]
  metadata?: XccdfMetadataType[]
}

/** Selectable item type (selectableItemType) - abstract, extends itemType */
export interface XccdfSelectableItemType extends XccdfItemType {
  selected?: boolean
  weight?: number
  rationale?: XccdfHtmlTextWithSubType[]
  platform?: XccdfOverrideableCPE2IdrefType[]
  requires?: XccdfIdrefListType[]
  conflicts?: XccdfIdrefType[]
}

/** Group element (groupType) */
export interface XccdfGroupType extends XccdfSelectableItemType {
  id: string
  Value?: XccdfValueType[]
  Group?: XccdfGroupType[]
  Rule?: XccdfRuleType[]
  signature?: XccdfSignatureType
}

/** Rule element (ruleType) */
export interface XccdfRuleType extends XccdfSelectableItemType {
  id: string
  role?: XccdfRoleEnumType
  severity?: XccdfSeverityEnumType
  multiple?: boolean
  ident?: XccdfIdentType[]
  impactMetric?: string
  profileNote?: XccdfProfileNoteType[]
  fixtext?: XccdfFixTextType[]
  fix?: XccdfFixType[]
  check?: XccdfCheckType[]
  complexCheck?: XccdfComplexCheckType
  signature?: XccdfSignatureType
}

/** Selected string type (selStringType) */
export interface XccdfSelStringType {
  value: string
  selector?: string
}

/** Selected numeric type (selNumType) */
export interface XccdfSelNumType {
  value: number
  selector?: string
}

/** Complex value type (complexValueType) */
export interface XccdfComplexValueType {
  item?: string[]
}

/** Selected complex value type (selComplexValueType) */
export interface XccdfSelComplexValueType extends XccdfComplexValueType {
  selector?: string
}

/** Selected choices type (selChoicesType) */
export interface XccdfSelChoicesType {
  mustMatch?: boolean
  selector?: string
  choice?: string[]
  complexChoice?: XccdfComplexValueType[]
}

/** URI ref type (uriRefType) */
export interface XccdfUriRefType {
  uri: string
}

/** Value element (valueType) */
export interface XccdfValueType extends XccdfItemType {
  id: string
  type?: XccdfValueTypeType
  operator?: XccdfValueOperatorType
  interactive?: boolean
  interfaceHint?: XccdfInterfaceHintType
  value: XccdfSelStringType[]
  complexValue?: XccdfSelComplexValueType[]
  default?: XccdfSelStringType[]
  complexDefault?: XccdfSelComplexValueType[]
  match?: XccdfSelStringType[]
  lowerBound?: XccdfSelNumType[]
  upperBound?: XccdfSelNumType[]
  choices?: XccdfSelChoicesType[]
  source?: XccdfUriRefType[]
  signature?: XccdfSignatureType
}

/** Profile select element (profileSelectType) */
export interface XccdfProfileSelectType {
  idref: string
  selected: boolean
  remark?: XccdfTextType[]
}

/** Profile set-value element (profileSetValueType) */
export interface XccdfProfileSetValueType {
  idref: string
  value: string
}

/** Profile set-complex-value element (profileSetComplexValueType) */
export interface XccdfProfileSetComplexValueType extends XccdfComplexValueType {
  idref: string
}

/** Profile refine-value element (profileRefineValueType) */
export interface XccdfProfileRefineValueType {
  idref: string
  selector?: string
  operator?: XccdfValueOperatorType
  remark?: XccdfTextType[]
}

/** Profile refine-rule element (profileRefineRuleType) */
export interface XccdfProfileRefineRuleType {
  idref: string
  weight?: number
  selector?: string
  severity?: XccdfSeverityEnumType
  role?: XccdfRoleEnumType
  remark?: XccdfTextType[]
}

/** Profile element (profileType) */
export interface XccdfProfileType {
  id: string
  prohibitChanges?: boolean
  abstract?: boolean
  noteTag?: string
  extends?: string
  Id?: string
  status?: XccdfStatus[]
  dcStatus?: XccdfDcStatusType[]
  version?: XccdfVersionType
  title: XccdfTextWithSubType[]
  description?: XccdfHtmlTextWithSubType[]
  reference?: XccdfReferenceType[]
  platform?: XccdfOverrideableCPE2IdrefType[]
  select?: XccdfProfileSelectType[]
  setValue?: XccdfProfileSetValueType[]
  setComplexValue?: XccdfProfileSetComplexValueType[]
  refineValue?: XccdfProfileRefineValueType[]
  refineRule?: XccdfProfileRefineRuleType[]
  metadata?: XccdfMetadataType[]
  signature?: XccdfSignatureType
}

/** Benchmark reference type (benchmarkReferenceType) */
export interface XccdfBenchmarkReferenceType {
  href: string
  id?: string
}

/** Tailoring benchmark reference type (tailoringBenchmarkReferenceType) */
export interface XccdfTailoringBenchmarkReferenceType extends XccdfBenchmarkReferenceType {
  version?: string
}

/** Tailoring reference type (tailoringReferenceType) */
export interface XccdfTailoringReferenceType {
  href: string
  id: string
  version: string
  time: string
}

/** Identity type (identityType) */
export interface XccdfIdentityType {
  value: string
  authenticated: boolean
  privileged: boolean
}

/** Fact type (factType) */
export interface XccdfFactType {
  value: string
  name: string
  type?: XccdfValueTypeType
}

/** Target facts type (targetFactsType) */
export interface XccdfTargetFactsType {
  fact?: XccdfFactType[]
}

/** Target id ref type (targetIdRefType) */
export interface XccdfTargetIdRefType {
  system: string
  href: string
  name?: string
}

/** Score type (scoreType) */
export interface XccdfScoreType {
  value: number
  system?: string
  maximum?: number
}

/** Message type (messageType) */
export interface XccdfMessageType {
  value: string
  severity: XccdfMsgSevEnumType
}

/** Instance result type (instanceResultType) */
export interface XccdfInstanceResultType {
  value: string
  context?: string
  parentContext?: string
}

/** Override type (overrideType) */
export interface XccdfOverrideType {
  time: string
  authority: string
  oldResult: XccdfResultEnumType
  newResult: XccdfResultEnumType
  remark: XccdfTextType
}

/** Rule result type (ruleResultType) */
export interface XccdfRuleResultType {
  idref: string
  role?: XccdfRoleEnumType
  severity?: XccdfSeverityEnumType
  time?: string
  version?: string
  weight?: number
  result: XccdfResultEnumType
  override?: XccdfOverrideType[]
  ident?: XccdfIdentType[]
  metadata?: XccdfMetadataType[]
  message?: XccdfMessageType[]
  instance?: XccdfInstanceResultType[]
  fix?: XccdfFixType[]
  check?: XccdfCheckType[]
  complexCheck?: XccdfComplexCheckType
}

/** TestResult element (testResultType) */
export interface XccdfTestResultType {
  id: string
  startTime?: string
  endTime: string
  testSystem?: string
  version?: string
  Id?: string
  benchmark?: XccdfBenchmarkReferenceType
  tailoringFile?: XccdfTailoringReferenceType
  title?: XccdfTextType[]
  remark?: XccdfTextType[]
  organization?: string[]
  identity?: XccdfIdentityType
  profile?: XccdfIdrefType
  target: string[]
  targetAddress?: string[]
  targetFacts?: XccdfTargetFactsType
  targetIdRef?: XccdfTargetIdRefType[]
  platform?: XccdfCPE2IdrefType[]
  setValue?: XccdfProfileSetValueType[]
  setComplexValue?: XccdfProfileSetComplexValueType[]
  ruleResult?: XccdfRuleResultType[]
  score: XccdfScoreType[]
  metadata?: XccdfMetadataType[]
  signature?: XccdfSignatureType
}

/** Tailoring version type (tailoringVersionType) */
export interface XccdfTailoringVersionType {
  value: string
  time: string
}

/** Tailoring element (tailoringType) */
export interface XccdfTailoringType {
  id: string
  Id?: string
  benchmark?: XccdfTailoringBenchmarkReferenceType
  status?: XccdfStatus[]
  dcStatus?: XccdfDcStatusType[]
  version: XccdfTailoringVersionType
  metadata?: XccdfMetadataType[]
  Profile: XccdfProfileType[]
  signature?: XccdfSignatureType
}

/** Benchmark element - root element of an XCCDF document */
export interface XccdfBenchmark {
  id: string
  Id?: string
  resolved?: boolean
  style?: string
  styleHref?: string
  lang?: string
  status: XccdfStatus[]
  dcStatus?: XccdfDcStatusType[]
  title?: XccdfTextType[]
  description?: XccdfHtmlTextWithSubType[]
  notice?: XccdfNoticeType[]
  frontMatter?: XccdfHtmlTextWithSubType[]
  rearMatter?: XccdfHtmlTextWithSubType[]
  reference?: XccdfReferenceType[]
  plainText?: XccdfPlainTextType[]
  platform?: XccdfCPE2IdrefType[]
  version: XccdfVersionType
  metadata?: XccdfMetadataType[]
  model?: XccdfModel[]
  Profile?: XccdfProfileType[]
  Value?: XccdfValueType[]
  Group?: XccdfGroupType[]
  Rule?: XccdfRuleType[]
  TestResult?: XccdfTestResultType[]
  signature?: XccdfSignatureType
}

export interface ValidationResult {
  valid: boolean
  errors?: string[] | null
}

export interface SarifValidateAsync {
  (input: string | SarifLog): Promise<ValidationResult>
}

export interface XccdfValidateAsync {
  (input: string | XccdfBenchmark): Promise<ValidationResult>
}

