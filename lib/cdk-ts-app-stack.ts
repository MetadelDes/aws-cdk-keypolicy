import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as iam from 'aws-cdk-lib/aws-iam';
import { CfnKey, CfnReplicaKey } from 'aws-cdk-lib/aws-kms';
import { Policy } from 'aws-cdk-lib/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const isDrEnabled = true;

    const policy = new Policy(this, 'MyPolicy');

    const key = new CfnKey(this, 'my-kms-key', {
      description: 'KMS key for encrypting the objects in an S3 bucket',
      keyPolicy: new iam.PolicyDocument({
        statements: [  new iam.PolicyStatement({
          sid: 'Admin',
          effect: iam.Effect.ALLOW,
          resources: ['*'],
          actions: [
            'kms:CancelKeyDeletion',
            'kms:CreateAlias',
            'kms:CreateCustomKeyStore',
            'kms:CreateGrant',
            'kms:CreateKey',
            'kms:DeleteAlias',
            'kms:DeleteCustomKeyStore',
            'kms:DeleteImportedKeyMaterial',
            'kms:DisableKey',
            'kms:DisableKeyRotation',
            'kms:EnableKey',
            'kms:EnableKeyRotation',
            'kms:GetPublicKey',
            'kms:PutKeyPolicy',
            'kms:RevokeGrant',
            'kms:ScheduleKeyDeletion',
            'kms:UpdateAlias',
            'kms:UpdateCustomKeyStore',
            'kms:UpdateKeyDescription',
            'kms:UpdatePrimaryRegion',
          ],
          principals: [new iam.AnyPrincipal()],
        }),],
      })
    });

        // Create a Replica Key
        if (isDrEnabled) { 
           const replicaKey = new CfnReplicaKey(this, 'MyCfnReplicaKey', { 
           keyPolicy: policy, 
           primaryKeyArn: key.attrArn,
          });
        }
    
  

    new cdk.CfnOutput(this, 'key-arn', {
      value: key.attrArn,
    });
  }
}

        // this.applyAdminPolicy(policy,
        //   [
        //     this.stack.adminRole,
        //   ],
        // );
  
  
  
  // private applyAdminPolicy(policy: Policy, adminRoles: iam.IPrincipal[]): void {
  //       policy.addStatements(
  //         new iam.PolicyStatement({
  //           sid: 'Admin',
  //           effect: iam.Effect.ALLOW,
  //           resources: ['*'],
  //           actions: [
  //             'kms:CancelKeyDeletion',
  //             'kms:CreateAlias',
  //             'kms:CreateCustomKeyStore',
  //             'kms:CreateGrant',
  //             'kms:CreateKey',
  //             'kms:DeleteAlias',
  //             'kms:DeleteCustomKeyStore',
  //             'kms:DeleteImportedKeyMaterial',
  //             'kms:DisableKey',
  //             'kms:DisableKeyRotation',
  //             'kms:EnableKey',
  //             'kms:EnableKeyRotation',
  //             'kms:GetPublicKey',
  //             'kms:PutKeyPolicy',
  //             'kms:RevokeGrant',
  //             'kms:ScheduleKeyDeletion',
  //             'kms:UpdateAlias',
  //             'kms:UpdateCustomKeyStore',
  //             'kms:UpdateKeyDescription',
  //             'kms:UpdatePrimaryRegion',
  //           ],
  //           principals: [new iam.AnyPrincipal()],
  //         }),
  //       );
  //     }
