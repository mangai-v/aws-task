#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsTaskStack } from '../lib/aws-task-stack';

const app = new cdk.App();
new AwsTaskStack(app, 'AwsTaskStack');