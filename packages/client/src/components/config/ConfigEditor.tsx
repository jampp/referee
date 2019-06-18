import * as React from 'react';

import './ConfigEditor.scss';
import ConfigFormView from './ConfigFormView';
import { loadCanaryConfigService } from '../../services';
import { RouterProps } from 'react-router';

interface Props extends RouterProps {}

export default class ConfigEditor extends React.Component<Props> {
  async componentDidMount(): Promise<void> {
    await loadCanaryConfigService.loadCanaryFromTemplate();
  }

  render(): React.ReactNode {
    return (
      <div className="config-editor">
        <ConfigFormView history={this.props.history} />
      </div>
    );
  }
}