'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const loadMinified = require('./load-minified')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
	  'process.env': env,
	  STATIC_PATH: JSON.stringify(config.build.assetsPublicPath + config.build.assetsSubDirectory)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
	new PrerenderSpaPlugin({
		// Required - The path to the webpack-outputted app to prerender.
		staticDir: path.join(__dirname, '../dist'),

		//define renderer to use
		renderer: new Renderer({
			//headless: false // Display the browser window when rendering. Useful for debugging.
			maxConcurrentRoutes: 4,
			timeout: 0
		}),

		// Optional minification.
		//https://github.com/kangax/html-minifier
		minify: {
			collapseBooleanAttributes: true,
			collapseWhitespace: true,
			decodeEntities: true,
			keepClosingSlash: true,
			sortAttributes: true,
			removeComments: true
		},

		/*postProcess (renderedRoute) {
			// Ignore any redirects.
			renderedRoute.path = renderedRoute.originalPath
			// Basic whitespace removal. (Don't use this in production.)
			//renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')

			return renderedRoute;
		},*/

		// Required - Routes to render.
		routes: [
			'/',

			//redirects
			'/home',
			'/about',
			'/about/meetTheTeam',
			'/about/ourVision',
			'/about/careers',
			'/about/press',
			'/support/contact',
			'/support/FAQ',
			'/support/community',
			'/legal/userAgreement',
			'/legal/privacyPolicy',
			'/legal/terms',
			'/legal/kycPolicy',
			'/technical/overview',
			'/technical/stats',
			'/technical/APIS',
			'/technical/samples',
			'/technical/support',
			'/oddJobs/bugBounty',
			'/oddJobs/smallJobs',
			'/oddJobs/submitInfo',
			'/timeline',
			'/environment',
			'/charity',
			'/exchanges',
			'/systemStatus',
			'/investors/overview',
			'/webmasters/overview',
			'/webmasters/integration',
			'/developers/overview',
			'/tools/wallet',
			'/tools/merchantTools',
			'/tools/blockchainExplorer',
			'/downloads',
			'/whitelisting',
			'/ico',
			'/ico/issue',

			//english
			'/en/home',
			'/en/about',
			'/en/about/meetTheTeam',
			'/en/about/ourVision',
			'/en/about/careers',
			'/en/about/press',
			'/en/support/contact',
			'/en/support/FAQ',
			'/en/support/community',
			'/en/legal/userAgreement',
			'/en/legal/privacyPolicy',
			'/en/legal/terms',
			'/en/legal/kycPolicy',
			'/en/legal/gdpr',
			'/en/technical/overview',
			'/en/technical/stats',
			'/en/technical/APIS',
			'/en/technical/samples',
			'/en/technical/support',
			'/en/oddJobs/bugBounty',
			'/en/oddJobs/smallJobs',
			'/en/oddJobs/submitInfo',
			'/en/timeline',
			'/en/environment',
			'/en/charity',
			'/en/exchanges',
			'/en/systemStatus',
			'/en/investors/overview',
			'/en/webmasters/overview',
			'/en/webmasters/integration',
			'/en/developers/overview',
			'/en/tools/wallet',
			'/en/tools/merchantTools',
			'/en/tools/blockchainExplorer',
			'/en/downloads',
			'/en/whitelisting',
			'/en/ico',
			'/en/ico/issue',

			//arabic
			'/ar/home',
			'/ar/about',
			'/ar/about/meetTheTeam',
			'/ar/about/ourVision',
			'/ar/about/careers',
			'/ar/about/press',
			'/ar/support/contact',
			'/ar/support/FAQ',
			'/ar/support/community',
			'/ar/legal/userAgreement',
			'/ar/legal/privacyPolicy',
			'/ar/legal/terms',
			'/ar/legal/kycPolicy',
			'/ar/legal/gdpr',
			'/ar/technical/overview',
			'/ar/technical/stats',
			'/ar/technical/APIS',
			'/ar/technical/samples',
			'/ar/technical/support',
			'/ar/oddJobs/bugBounty',
			'/ar/oddJobs/smallJobs',
			'/ar/oddJobs/submitInfo',
			'/ar/timeline',
			'/ar/environment',
			'/ar/charity',
			'/ar/exchanges',
			'/ar/systemStatus',
			'/ar/investors/overview',
			'/ar/webmasters/overview',
			'/ar/webmasters/integration',
			'/ar/developers/overview',
			'/ar/tools/wallet',
			'/ar/tools/merchantTools',
			'/ar/tools/blockchainExplorer',
			'/ar/downloads',
			'/ar/whitelisting',
			'/ar/ico',
			'/ar/ico/issue',

			//bg
			'/bg/home',
			'/bg/about',
			'/bg/about/meetTheTeam',
			'/bg/about/ourVision',
			'/bg/about/careers',
			'/bg/about/press',
			'/bg/support/contact',
			'/bg/support/FAQ',
			'/bg/support/community',
			'/bg/legal/userAgreement',
			'/bg/legal/privacyPolicy',
			'/bg/legal/terms',
			'/bg/legal/kycPolicy',
			'/bg/legal/gdpr',
			'/bg/technical/overview',
			'/bg/technical/stats',
			'/bg/technical/APIS',
			'/bg/technical/samples',
			'/bg/technical/support',
			'/bg/oddJobs/bugBounty',
			'/bg/oddJobs/smallJobs',
			'/bg/oddJobs/submitInfo',
			'/bg/timeline',
			'/bg/environment',
			'/bg/charity',
			'/bg/exchanges',
			'/bg/systemStatus',
			'/bg/investors/overview',
			'/bg/webmasters/overview',
			'/bg/webmasters/integration',
			'/bg/developers/overview',
			'/bg/tools/wallet',
			'/bg/tools/merchantTools',
			'/bg/tools/blockchainExplorer',
			'/bg/downloads',
			'/bg/whitelisting',
			'/bg/ico',
			'/bg/ico/issue',

			//chinese
			'/zh/home',
			'/zh/about',
			'/zh/about/meetTheTeam',
			'/zh/about/ourVision',
			'/zh/about/careers',
			'/zh/about/press',
			'/zh/support/contact',
			'/zh/support/FAQ',
			'/zh/support/community',
			'/zh/legal/userAgreement',
			'/zh/legal/privacyPolicy',
			'/zh/legal/terms',
			'/zh/legal/kycPolicy',
			'/zh/legal/gdpr',
			'/zh/technical/overview',
			'/zh/technical/stats',
			'/zh/technical/APIS',
			'/zh/technical/samples',
			'/zh/technical/support',
			'/zh/oddJobs/bugBounty',
			'/zh/oddJobs/smallJobs',
			'/zh/oddJobs/submitInfo',
			'/zh/timeline',
			'/zh/environment',
			'/zh/charity',
			'/zh/exchanges',
			'/zh/systemStatus',
			'/zh/investors/overview',
			'/zh/webmasters/overview',
			'/zh/webmasters/integration',
			'/zh/developers/overview',
			'/zh/tools/wallet',
			'/zh/tools/merchantTools',
			'/zh/tools/blockchainExplorer',
			'/zh/downloads',
			'/zh/whitelisting',
			'/zh/ico',
			'/zh/ico/issue',

			//German
			'/de/home',
			'/de/about',
			'/de/about/meetTheTeam',
			'/de/about/ourVision',
			'/de/about/careers',
			'/de/about/press',
			'/de/support/contact',
			'/de/support/FAQ',
			'/de/support/community',
			'/de/legal/userAgreement',
			'/de/legal/privacyPolicy',
			'/de/legal/terms',
			'/de/legal/kycPolicy',
			'/de/legal/gdpr',
			'/de/technical/overview',
			'/de/technical/stats',
			'/de/technical/APIS',
			'/de/technical/samples',
			'/de/technical/support',
			'/de/oddJobs/bugBounty',
			'/de/oddJobs/smallJobs',
			'/de/oddJobs/submitInfo',
			'/de/timeline',
			'/de/environment',
			'/de/charity',
			'/de/exchanges',
			'/de/systemStatus',
			'/de/investors/overview',
			'/de/webmasters/overview',
			'/de/webmasters/integration',
			'/de/developers/overview',
			'/de/tools/wallet',
			'/de/tools/merchantTools',
			'/de/tools/blockchainExplorer',
			'/de/downloads',
			'/de/whitelisting',
			'/de/ico',
			'/de/ico/issue',

			//Spanish
			'/es/home',
			'/es/about',
			'/es/about/meetTheTeam',
			'/es/about/ourVision',
			'/es/about/careers',
			'/es/about/press',
			'/es/support/contact',
			'/es/support/FAQ',
			'/es/support/community',
			'/es/legal/userAgreement',
			'/es/legal/privacyPolicy',
			'/es/legal/terms',
			'/es/legal/kycPolicy',
			'/es/legal/gdpr',
			'/es/technical/overview',
			'/es/technical/stats',
			'/es/technical/APIS',
			'/es/technical/samples',
			'/es/technical/support',
			'/es/oddJobs/bugBounty',
			'/es/oddJobs/smallJobs',
			'/es/oddJobs/submitInfo',
			'/es/timeline',
			'/es/environment',
			'/es/charity',
			'/es/exchanges',
			'/es/systemStatus',
			'/es/investors/overview',
			'/es/webmasters/overview',
			'/es/webmasters/integration',
			'/es/developers/overview',
			'/es/tools/wallet',
			'/es/tools/merchantTools',
			'/es/tools/blockchainExplorer',
			'/es/downloads',
			'/es/whitelisting',
			'/es/ico',
			'/es/ico/issue',

			//finnish
			'/fi/home',
			'/fi/about',
			'/fi/about/meetTheTeam',
			'/fi/about/ourVision',
			'/fi/about/careers',
			'/fi/about/press',
			'/fi/support/contact',
			'/fi/support/FAQ',
			'/fi/support/community',
			'/fi/legal/userAgreement',
			'/fi/legal/privacyPolicy',
			'/fi/legal/terms',
			'/fi/legal/kycPolicy',
			'/fi/legal/gdpr',
			'/fi/technical/overview',
			'/fi/technical/stats',
			'/fi/technical/APIS',
			'/fi/technical/samples',
			'/fi/technical/support',
			'/fi/oddJobs/bugBounty',
			'/fi/oddJobs/smallJobs',
			'/fi/oddJobs/submitInfo',
			'/fi/timeline',
			'/fi/environment',
			'/fi/charity',
			'/fi/exchanges',
			'/fi/systemStatus',
			'/fi/investors/overview',
			'/fi/webmasters/overview',
			'/fi/webmasters/integration',
			'/fi/developers/overview',
			'/fi/tools/wallet',
			'/fi/tools/merchantTools',
			'/fi/tools/blockchainExplorer',
			'/fi/downloads',
			'/fi/whitelisting',
			'/fi/ico',
			'/fi/ico/issue',

			//french
			'/fr/home',
			'/fr/about',
			'/fr/about/meetTheTeam',
			'/fr/about/ourVision',
			'/fr/about/careers',
			'/fr/about/press',
			'/fr/support/contact',
			'/fr/support/FAQ',
			'/fr/support/community',
			'/fr/legal/userAgreement',
			'/fr/legal/privacyPolicy',
			'/fr/legal/terms',
			'/fr/legal/kycPolicy',
			'/fr/legal/gdpr',
			'/fr/technical/overview',
			'/fr/technical/stats',
			'/fr/technical/APIS',
			'/fr/technical/samples',
			'/fr/technical/support',
			'/fr/oddJobs/bugBounty',
			'/fr/oddJobs/smallJobs',
			'/fr/oddJobs/submitInfo',
			'/fr/timeline',
			'/fr/environment',
			'/fr/charity',
			'/fr/exchanges',
			'/fr/systemStatus',
			'/fr/investors/overview',
			'/fr/webmasters/overview',
			'/fr/webmasters/integration',
			'/fr/developers/overview',
			'/fr/tools/wallet',
			'/fr/tools/merchantTools',
			'/fr/tools/blockchainExplorer',
			'/fr/downloads',
			'/fr/whitelisting',
			'/fr/ico',
			'/fr/ico/issue',

			//Indonesian
			'/id/home',
			'/id/about',
			'/id/about/meetTheTeam',
			'/id/about/ourVision',
			'/id/about/careers',
			'/id/about/press',
			'/id/support/contact',
			'/id/support/FAQ',
			'/id/support/community',
			'/id/legal/userAgreement',
			'/id/legal/privacyPolicy',
			'/id/legal/terms',
			'/id/legal/kycPolicy',
			'/id/legal/gdpr',
			'/id/technical/overview',
			'/id/technical/stats',
			'/id/technical/APIS',
			'/id/technical/samples',
			'/id/technical/support',
			'/id/oddJobs/bugBounty',
			'/id/oddJobs/smallJobs',
			'/id/oddJobs/submitInfo',
			'/id/timeline',
			'/id/environment',
			'/id/charity',
			'/id/exchanges',
			'/id/systemStatus',
			'/id/investors/overview',
			'/id/webmasters/overview',
			'/id/webmasters/integration',
			'/id/developers/overview',
			'/id/tools/wallet',
			'/id/tools/merchantTools',
			'/id/tools/blockchainExplorer',
			'/id/downloads',
			'/id/whitelisting',
			'/id/ico',
			'/id/ico/issue',

			//Italian
			'/it/home',
			'/it/about',
			'/it/about/meetTheTeam',
			'/it/about/ourVision',
			'/it/about/careers',
			'/it/about/press',
			'/it/support/contact',
			'/it/support/FAQ',
			'/it/support/community',
			'/it/legal/userAgreement',
			'/it/legal/privacyPolicy',
			'/it/legal/terms',
			'/it/legal/kycPolicy',
			'/it/legal/gdpr',
			'/it/technical/overview',
			'/it/technical/stats',
			'/it/technical/APIS',
			'/it/technical/samples',
			'/it/technical/support',
			'/it/oddJobs/bugBounty',
			'/it/oddJobs/smallJobs',
			'/it/oddJobs/submitInfo',
			'/it/timeline',
			'/it/environment',
			'/it/charity',
			'/it/exchanges',
			'/it/systemStatus',
			'/it/investors/overview',
			'/it/webmasters/overview',
			'/it/webmasters/integration',
			'/it/developers/overview',
			'/it/tools/wallet',
			'/it/tools/merchantTools',
			'/it/tools/blockchainExplorer',
			'/it/downloads',
			'/it/whitelisting',
			'/it/ico',
			'/it/ico/issue',

			//japanese
			'/ja/home',
			'/ja/about',
			'/ja/about/meetTheTeam',
			'/ja/about/ourVision',
			'/ja/about/careers',
			'/ja/about/press',
			'/ja/support/contact',
			'/ja/support/FAQ',
			'/ja/support/community',
			'/ja/legal/userAgreement',
			'/ja/legal/privacyPolicy',
			'/ja/legal/terms',
			'/ja/legal/kycPolicy',
			'/ja/legal/gdpr',
			'/ja/technical/overview',
			'/ja/technical/stats',
			'/ja/technical/APIS',
			'/ja/technical/samples',
			'/ja/technical/support',
			'/ja/oddJobs/bugBounty',
			'/ja/oddJobs/smallJobs',
			'/ja/oddJobs/submitInfo',
			'/ja/timeline',
			'/ja/environment',
			'/ja/charity',
			'/ja/exchanges',
			'/ja/systemStatus',
			'/ja/investors/overview',
			'/ja/webmasters/overview',
			'/ja/webmasters/integration',
			'/ja/developers/overview',
			'/ja/tools/wallet',
			'/ja/tools/merchantTools',
			'/ja/tools/blockchainExplorer',
			'/ja/downloads',
			'/ja/whitelisting',
			'/ja/ico',
			'/ja/ico/issue',

			//Korean
			'/ko/home',
			'/ko/about',
			'/ko/about/meetTheTeam',
			'/ko/about/ourVision',
			'/ko/about/careers',
			'/ko/about/press',
			'/ko/support/contact',
			'/ko/support/FAQ',
			'/ko/support/community',
			'/ko/legal/userAgreement',
			'/ko/legal/privacyPolicy',
			'/ko/legal/terms',
			'/ko/legal/kycPolicy',
			'/ko/legal/gdpr',
			'/ko/technical/overview',
			'/ko/technical/stats',
			'/ko/technical/APIS',
			'/ko/technical/samples',
			'/ko/technical/support',
			'/ko/oddJobs/bugBounty',
			'/ko/oddJobs/smallJobs',
			'/ko/oddJobs/submitInfo',
			'/ko/timeline',
			'/ko/environment',
			'/ko/charity',
			'/ko/exchanges',
			'/ko/systemStatus',
			'/ko/investors/overview',
			'/ko/webmasters/overview',
			'/ko/webmasters/integration',
			'/ko/developers/overview',
			'/ko/tools/wallet',
			'/ko/tools/merchantTools',
			'/ko/tools/blockchainExplorer',
			'/ko/downloads',
			'/ko/whitelisting',
			'/ko/ico',
			'/ko/ico/issue',

			//
			'/ms/home',
			'/ms/about',
			'/ms/about/meetTheTeam',
			'/ms/about/ourVision',
			'/ms/about/careers',
			'/ms/about/press',
			'/ms/support/contact',
			'/ms/support/FAQ',
			'/ms/support/community',
			'/ms/legal/userAgreement',
			'/ms/legal/privacyPolicy',
			'/ms/legal/terms',
			'/ms/legal/kycPolicy',
			'/ms/legal/gdpr',
			'/ms/technical/overview',
			'/ms/technical/stats',
			'/ms/technical/APIS',
			'/ms/technical/samples',
			'/ms/technical/support',
			'/ms/oddJobs/bugBounty',
			'/ms/oddJobs/smallJobs',
			'/ms/oddJobs/submitInfo',
			'/ms/timeline',
			'/ms/environment',
			'/ms/charity',
			'/ms/exchanges',
			'/ms/systemStatus',
			'/ms/investors/overview',
			'/ms/webmasters/overview',
			'/ms/webmasters/integration',
			'/ms/developers/overview',
			'/ms/tools/wallet',
			'/ms/tools/merchantTools',
			'/ms/tools/blockchainExplorer',
			'/ms/downloads',
			'/ms/whitelisting',
			'/ms/ico',
			'/ms/ico/issue',

			//
			'/nl/home',
			'/nl/about',
			'/nl/about/meetTheTeam',
			'/nl/about/ourVision',
			'/nl/about/careers',
			'/nl/about/press',
			'/nl/support/contact',
			'/nl/support/FAQ',
			'/nl/support/community',
			'/nl/legal/userAgreement',
			'/nl/legal/privacyPolicy',
			'/nl/legal/terms',
			'/nl/legal/kycPolicy',
			'/nl/legal/gdpr',
			'/nl/technical/overview',
			'/nl/technical/stats',
			'/nl/technical/APIS',
			'/nl/technical/samples',
			'/nl/technical/support',
			'/nl/oddJobs/bugBounty',
			'/nl/oddJobs/smallJobs',
			'/nl/oddJobs/submitInfo',
			'/nl/timeline',
			'/nl/environment',
			'/nl/charity',
			'/nl/exchanges',
			'/nl/systemStatus',
			'/nl/investors/overview',
			'/nl/webmasters/overview',
			'/nl/webmasters/integration',
			'/nl/developers/overview',
			'/nl/tools/wallet',
			'/nl/tools/merchantTools',
			'/nl/tools/blockchainExplorer',
			'/nl/downloads',
			'/nl/whitelisting',
			'/nl/ico',
			'/nl/ico/issue',

			//
			'/no/home',
			'/no/about',
			'/no/about/meetTheTeam',
			'/no/about/ourVision',
			'/no/about/careers',
			'/no/about/press',
			'/no/support/contact',
			'/no/support/FAQ',
			'/no/support/community',
			'/no/legal/userAgreement',
			'/no/legal/privacyPolicy',
			'/no/legal/terms',
			'/no/legal/kycPolicy',
			'/no/legal/gdpr',
			'/no/technical/overview',
			'/no/technical/stats',
			'/no/technical/APIS',
			'/no/technical/samples',
			'/no/technical/support',
			'/no/oddJobs/bugBounty',
			'/no/oddJobs/smallJobs',
			'/no/oddJobs/submitInfo',
			'/no/timeline',
			'/no/environment',
			'/no/charity',
			'/no/exchanges',
			'/no/systemStatus',
			'/no/investors/overview',
			'/no/webmasters/overview',
			'/no/webmasters/integration',
			'/no/developers/overview',
			'/no/tools/wallet',
			'/no/tools/merchantTools',
			'/no/tools/blockchainExplorer',
			'/no/downloads',
			'/no/whitelisting',
			'/no/ico',
			'/no/ico/issue',

			//Portugese
			'/pt/home',
			'/pt/about',
			'/pt/about/meetTheTeam',
			'/pt/about/ourVision',
			'/pt/about/careers',
			'/pt/about/press',
			'/pt/support/contact',
			'/pt/support/FAQ',
			'/pt/support/community',
			'/pt/legal/userAgreement',
			'/pt/legal/privacyPolicy',
			'/pt/legal/terms',
			'/pt/legal/kycPolicy',
			'/pt/legal/gdpr',
			'/pt/technical/overview',
			'/pt/technical/stats',
			'/pt/technical/APIS',
			'/pt/technical/samples',
			'/pt/technical/support',
			'/pt/oddJobs/bugBounty',
			'/pt/oddJobs/smallJobs',
			'/pt/oddJobs/submitInfo',
			'/pt/timeline',
			'/pt/environment',
			'/pt/charity',
			'/pt/exchanges',
			'/pt/systemStatus',
			'/pt/investors/overview',
			'/pt/webmasters/overview',
			'/pt/webmasters/integration',
			'/pt/developers/overview',
			'/pt/tools/wallet',
			'/pt/tools/merchantTools',
			'/pt/tools/blockchainExplorer',
			'/pt/downloads',
			'/pt/whitelisting',
			'/pt/ico',
			'/pt/ico/issue',

			//Romanian
			'/ro/home',
			'/ro/about',
			'/ro/about/meetTheTeam',
			'/ro/about/ourVision',
			'/ro/about/careers',
			'/ro/about/press',
			'/ro/support/contact',
			'/ro/support/FAQ',
			'/ro/support/community',
			'/ro/legal/userAgreement',
			'/ro/legal/privacyPolicy',
			'/ro/legal/terms',
			'/ro/legal/kycPolicy',
			'/ro/legal/gdpr',
			'/ro/technical/overview',
			'/ro/technical/stats',
			'/ro/technical/APIS',
			'/ro/technical/samples',
			'/ro/technical/support',
			'/ro/oddJobs/bugBounty',
			'/ro/oddJobs/smallJobs',
			'/ro/oddJobs/submitInfo',
			'/ro/timeline',
			'/ro/environment',
			'/ro/charity',
			'/ro/exchanges',
			'/ro/systemStatus',
			'/ro/investors/overview',
			'/ro/webmasters/overview',
			'/ro/webmasters/integration',
			'/ro/developers/overview',
			'/ro/tools/wallet',
			'/ro/tools/merchantTools',
			'/ro/tools/blockchainExplorer',
			'/ro/downloads',
			'/ro/whitelisting',
			'/ro/ico',
			'/ro/ico/issue',

			//Russian
			'/ru/home',
			'/ru/about',
			'/ru/about/meetTheTeam',
			'/ru/about/ourVision',
			'/ru/about/careers',
			'/ru/about/press',
			'/ru/support/contact',
			'/ru/support/FAQ',
			'/ru/support/community',
			'/ru/legal/userAgreement',
			'/ru/legal/privacyPolicy',
			'/ru/legal/terms',
			'/ru/legal/kycPolicy',
			'/ru/legal/gdpr',
			'/ru/technical/overview',
			'/ru/technical/stats',
			'/ru/technical/APIS',
			'/ru/technical/samples',
			'/ru/technical/support',
			'/ru/oddJobs/bugBounty',
			'/ru/oddJobs/smallJobs',
			'/ru/oddJobs/submitInfo',
			'/ru/timeline',
			'/ru/environment',
			'/ru/charity',
			'/ru/exchanges',
			'/ru/systemStatus',
			'/ru/investors/overview',
			'/ru/webmasters/overview',
			'/ru/webmasters/integration',
			'/ru/developers/overview',
			'/ru/tools/wallet',
			'/ru/tools/merchantTools',
			'/ru/tools/blockchainExplorer',
			'/ru/downloads',
			'/ru/whitelisting',
			'/ru/ico',
			'/ru/ico/issue',

			//Slovenian
			'/si/home',
			'/si/about',
			'/si/about/meetTheTeam',
			'/si/about/ourVision',
			'/si/about/careers',
			'/si/about/press',
			'/si/support/contact',
			'/si/support/FAQ',
			'/si/support/community',
			'/si/legal/userAgreement',
			'/si/legal/privacyPolicy',
			'/si/legal/terms',
			'/si/legal/kycPolicy',
			'/si/legal/gdpr',
			'/si/technical/overview',
			'/si/technical/stats',
			'/si/technical/APIS',
			'/si/technical/samples',
			'/si/technical/support',
			'/si/oddJobs/bugBounty',
			'/si/oddJobs/smallJobs',
			'/si/oddJobs/submitInfo',
			'/si/timeline',
			'/si/environment',
			'/si/charity',
			'/si/exchanges',
			'/si/systemStatus',
			'/si/investors/overview',
			'/si/webmasters/overview',
			'/si/webmasters/integration',
			'/si/developers/overview',
			'/si/tools/wallet',
			'/si/tools/merchantTools',
			'/si/tools/blockchainExplorer',
			'/si/downloads',
			'/si/whitelisting',
			'/si/ico',
			'/si/ico/issue',

			//Swedish
			'/se/home',
			'/se/about',
			'/se/about/meetTheTeam',
			'/se/about/ourVision',
			'/se/about/careers',
			'/se/about/press',
			'/se/support/contact',
			'/se/support/FAQ',
			'/se/support/community',
			'/se/legal/userAgreement',
			'/se/legal/privacyPolicy',
			'/se/legal/terms',
			'/se/legal/kycPolicy',
			'/se/legal/gdpr',
			'/se/technical/overview',
			'/se/technical/stats',
			'/se/technical/APIS',
			'/se/technical/samples',
			'/se/technical/support',
			'/se/oddJobs/bugBounty',
			'/se/oddJobs/smallJobs',
			'/se/oddJobs/submitInfo',
			'/se/timeline',
			'/se/environment',
			'/se/charity',
			'/se/exchanges',
			'/se/systemStatus',
			'/se/investors/overview',
			'/se/webmasters/overview',
			'/se/webmasters/integration',
			'/se/developers/overview',
			'/se/tools/wallet',
			'/se/tools/merchantTools',
			'/se/tools/blockchainExplorer',
			'/se/downloads',
			'/se/whitelisting',
			'/se/ico',
			'/se/ico/issue',

			//Thai
			'/th/home',
			'/th/about',
			'/th/about/meetTheTeam',
			'/th/about/ourVision',
			'/th/about/careers',
			'/th/about/press',
			'/th/support/contact',
			'/th/support/FAQ',
			'/th/support/community',
			'/th/legal/userAgreement',
			'/th/legal/privacyPolicy',
			'/th/legal/terms',
			'/th/legal/kycPolicy',
			'/th/legal/gdpr',
			'/th/technical/overview',
			'/th/technical/stats',
			'/th/technical/APIS',
			'/th/technical/samples',
			'/th/technical/support',
			'/th/oddJobs/bugBounty',
			'/th/oddJobs/smallJobs',
			'/th/oddJobs/submitInfo',
			'/th/timeline',
			'/th/environment',
			'/th/charity',
			'/th/exchanges',
			'/th/systemStatus',
			'/th/investors/overview',
			'/th/webmasters/overview',
			'/th/webmasters/integration',
			'/th/developers/overview',
			'/th/tools/wallet',
			'/th/tools/merchantTools',
			'/th/tools/blockchainExplorer',
			'/th/downloads',
			'/th/whitelisting',
			'/th/ico',
			'/th/ico/issue',

			//taiwanese
			'/tw/home',
			'/tw/about',
			'/tw/about/meetTheTeam',
			'/tw/about/ourVision',
			'/tw/about/careers',
			'/tw/about/press',
			'/tw/support/contact',
			'/tw/support/FAQ',
			'/tw/support/community',
			'/tw/legal/userAgreement',
			'/tw/legal/privacyPolicy',
			'/tw/legal/terms',
			'/tw/legal/kycPolicy',
			'/tw/legal/gdpr',
			'/tw/technical/overview',
			'/tw/technical/stats',
			'/tw/technical/APIS',
			'/tw/technical/samples',
			'/tw/technical/support',
			'/tw/oddJobs/bugBounty',
			'/tw/oddJobs/smallJobs',
			'/tw/oddJobs/submitInfo',
			'/tw/timeline',
			'/tw/environment',
			'/tw/charity',
			'/tw/exchanges',
			'/tw/systemStatus',
			'/tw/investors/overview',
			'/tw/webmasters/overview',
			'/tw/webmasters/integration',
			'/tw/developers/overview',
			'/tw/tools/wallet',
			'/tw/tools/merchantTools',
			'/tw/tools/blockchainExplorer',
			'/tw/downloads',
			'/tw/whitelisting',
			'/tw/ico',
			'/tw/ico/issue',

			//test
			'/en/banner1',

			//blog
			'/blog/news',
			'/blog/news/page/1/',
			'/blog/news/page/2/',
			'/blog/news/page/3/',
			'/blog/news/page/4/',
			'/blog/news/page/5/',
			'/blog/news/page/6/',
			'/blog/news/page/7/',
			'/blog/news/page/8/',
			'/blog/news/page/9/',
			'/blog/announcements',
			'/blog/announcements/page/1/',
			'/blog/announcements/page/2/',
			'/blog/announcements/page/3/',
			'/blog/announcements/page/4/',
			'/blog/announcements/page/5/',
			'/blog/announcements/page/6/',
			'/blog/announcements/page/7/',
			'/blog/announcements/page/8/',
			'/blog/announcements/page/9/',
			'/blog/investors',
			'/blog/investors/page/1/',
			'/blog/investors/page/2/',
			'/blog/investors/page/3/',
			'/blog/investors/page/4/',
			'/blog/investors/page/5/',
			'/blog/investors/page/6/',
			'/blog/investors/page/7/',
			'/blog/investors/page/8/',
			'/blog/investors/page/9/',
			'/blog/code',
			'/blog/code/page/1/',
			'/blog/code/page/2/',
			'/blog/code/page/3/',
			'/blog/code/page/4/',
			'/blog/code/page/5/',
			'/blog/code/page/6/',
			'/blog/code/page/7/',
			'/blog/code/page/8/',
			'/blog/code/page/9/',
			'/blog/development',
			'/blog/development/page/1/',
			'/blog/development/page/2/',
			'/blog/development/page/3/',
			'/blog/development/page/4/',
			'/blog/development/page/5/',
			'/blog/development/page/6/',
			'/blog/development/page/7/',
			'/blog/development/page/8/',
			'/blog/development/page/9/'

		]
	}),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'jse-website_ico_030818',
      filename: 'jse-web-worker_ico.js',
	  //staticFileGlobs: ['dist/**/*.{js,html,css}'],
	  staticFileGlobsIgnorePatterns: [/\.map$/], // use this to ignore sourcemap files
	  staticFileGlobs: [
		'dist/**/*.{js,css}',
		'dist/index.html'
	  ],
      minify: true,
      stripPrefix: 'dist/'
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
