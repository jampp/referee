import { observer } from 'mobx-react';
import { KvMap } from '../../domain/CustomTypes';
import * as React from 'react';
import { InlineTextGroup } from '../../layout/InlineTextGroup';
import { CanaryScope } from '../../domain/CanaryExecutionRequestTypes';
import Flatpickr from 'react-flatpickr';
import './ScopeItem.scss';
import 'flatpickr/dist/themes/airbnb.css';
import { FormLabel, Row } from 'react-bootstrap';

interface ScopeProps {
  scopeType: string;
  scope: CanaryScope;
  updateCanaryScope: (newScope: CanaryScope, type: string) => void;
  disabled?: boolean;
  touch: (name: string) => void;
  touched: KvMap<boolean>;
  errors: KvMap<string>;
  hasTheRunButtonBeenClicked: boolean;
}

@observer
export default class ScopeItem extends React.Component<ScopeProps> {
  private handleNameChange(value: string, scope: CanaryScope): CanaryScope {
    scope.scope = value;
    return scope;
  }

  private handleLocationChange(value: string, scope: CanaryScope): CanaryScope {
    scope.location = value;
    return scope;
  }

  private handleStepChange(value: number, scope: CanaryScope): CanaryScope {
    scope.step = value;
    return scope;
  }

  private handleStartChange(value: string, scope: CanaryScope): CanaryScope {
    scope.start = value;
    return scope;
  }

  private handleEndChange(value: string, scope: CanaryScope): CanaryScope {
    scope.end = value;
    return scope;
  }

  render(): React.ReactNode {
    const {
      scopeType,
      scope,
      updateCanaryScope,
      disabled,
      touch,
      touched,
      errors,
      hasTheRunButtonBeenClicked
    } = this.props;

    return (
      <div id="scope-item">
        <div id="scope-title">{scopeType}</div>
        <InlineTextGroup
          id={scopeType + '-scope-name'}
          label="Scope"
          value={scope.scope}
          disabled={disabled}
          placeHolderText="stack name or server group"
          onChange={e => {
            const newScope = this.handleNameChange(e.target.value, scope);
            updateCanaryScope(newScope, scopeType);
          }}
          onBlur={() => {
            touch(scopeType + '-scope-name');
          }}
          touched={touched[scopeType + '-scope-name'] || hasTheRunButtonBeenClicked}
          error={errors['scopes.default.' + scopeType + 'Scope.scope']}
        />
        <InlineTextGroup
          id={scopeType + '-location'}
          label="Location"
          value={scope.location}
          disabled={disabled}
          placeHolderText="AWS region"
          onChange={e => {
            const newScope = this.handleLocationChange(e.target.value, scope);
            updateCanaryScope(newScope, scopeType);
          }}
          onBlur={() => {
            touch(scopeType + '-location');
          }}
          touched={touched[scopeType + '-location'] || hasTheRunButtonBeenClicked}
          error={errors['scopes.default.' + scopeType + 'Scope.location']}
        />
        <InlineTextGroup
          id={scopeType + '-step'}
          label="Step (s)"
          value={scope.step.toString()}
          disabled={disabled}
          onChange={e => {
            const newScope = this.handleStepChange(
              parseInt((e.target as HTMLInputElement).value, 10)
                ? parseInt((e.target as HTMLInputElement).value, 10)
                : 0,
              scope
            );
            updateCanaryScope(newScope, scopeType);
          }}
          onBlur={() => {
            touch(scopeType + '-step');
          }}
          touched={touched[scopeType + '-step'] || hasTheRunButtonBeenClicked}
          error={errors['scopes.default.' + scopeType + 'Scope.step']}
        />
        {!disabled && (
          <Row>
            <FormLabel id="scope-item-label">Start Time</FormLabel>
            <Flatpickr
              id="scope-time-picker"
              data-enable-time
              value={scope.start}
              onChange={date => {
                if (date && date.length) {
                  const newScope = this.handleStartChange(date[0].toISOString(), scope);
                  updateCanaryScope(newScope, scopeType);
                }
              }}
              options={{ enableTime: true, dateFormat: 'Y-m-d H:i', defaultDate: 'today' }}
            />
          </Row>
        )}
        <InlineTextGroup
          id={scopeType + '-start'}
          label="Start Time ISO"
          value={scope.start}
          disabled={disabled}
          placeHolderText="start time stamp"
          onChange={e => {
            const newScope = this.handleStartChange(e.target.value, scope);
            updateCanaryScope(newScope, scopeType);
          }}
          onBlur={() => {
            touch(scopeType + '-start');
          }}
          touched={touched[scopeType + '-start'] || hasTheRunButtonBeenClicked}
          error={errors['scopes.default.' + scopeType + 'Scope.start']}
        />
        {!disabled && (
          <Row>
            <FormLabel id="scope-item-label">End Time</FormLabel>
            <Flatpickr
              id="scope-time-picker"
              data-enable-time
              value={scope.end}
              onChange={date => {
                if (date && date.length) {
                  const newScope = this.handleEndChange(date[0].toISOString(), scope);
                  updateCanaryScope(newScope, scopeType);
                }
              }}
              options={{ enableTime: true, dateFormat: 'Y-m-d H:i', defaultDate: 'today' }}
            />
          </Row>
        )}
        <InlineTextGroup
          id={scopeType + '-end'}
          label="End Time ISO"
          value={scope.end}
          disabled={disabled}
          placeHolderText="end time stamp"
          onChange={e => {
            const newScope = this.handleEndChange(e.target.value, scope);
            updateCanaryScope(newScope, scopeType);
          }}
          onBlur={() => {
            touch(scopeType + '-end');
          }}
          touched={touched[scopeType + '-end'] || hasTheRunButtonBeenClicked}
          error={errors['scopes.default.' + scopeType + 'Scope.end']}
        />
      </div>
    );
  }
}